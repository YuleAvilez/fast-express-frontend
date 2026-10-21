import { RULES } from '../config/businessRules';
import type { QuoteRequest, QuoteResult } from '../types';

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
    public fieldErrors?: Partial<Record<'weight' | 'clientType' | 'shipmentType', string>>,
  ) {
    super(message);
  }
}

const USE_MOCK = import.meta.env.VITE_USE_MOCK !== 'false';
const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:8080';

const round = (n: number) => Math.round(n * 100) / 100;

/** Simula al backend, incluida su validación (el cliente nunca es la única barrera). */
async function mockQuote(req: QuoteRequest): Promise<QuoteResult> {
  await new Promise((r) => setTimeout(r, 700));
  if (req.weightKg > RULES.WEIGHT_MAX) {
    throw new ApiError(422, 'Peso fuera de rango.', {
      weight: `El servidor rechazó el peso: el máximo permitido es ${RULES.WEIGHT_MAX} kg.`,
    });
  }
  const base =
    req.weightKg <= RULES.WEIGHT_LIGHT_MAX ? 8 : 8 + (req.weightKg - RULES.WEIGHT_LIGHT_MAX) * 1.2;
  const surcharge = req.shipmentType === 'EXPRESS' ? base * 0.6 : 0;
  const rate = { REGULAR: 0, PREMIUM: 0.1, CORPORATIVO: 0.15 }[req.clientType];
  const discount = (base + surcharge) * rate;
  return {
    baseCost: round(base),
    shipmentSurcharge: round(surcharge),
    discount: round(discount),
    total: round(base + surcharge - discount),
    currency: 'USD',
  };
}

export async function requestQuote(req: QuoteRequest): Promise<QuoteResult> {
  if (USE_MOCK) return mockQuote(req);

  let res: Response;
  try {
    res = await fetch(`${API_URL}/api/quotes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req),
    });
  } catch {
    throw new ApiError(0, 'No pudimos conectar con el servidor. Revisa tu conexión e inténtalo de nuevo.');
  }

  if (res.ok) return (await res.json()) as QuoteResult;

  const body = await res.json().catch(() => ({}));
  if (res.status === 400 || res.status === 422) {
    throw new ApiError(res.status, body.message ?? 'Los datos enviados no son válidos.', body.errors);
  }
  throw new ApiError(res.status, 'Ocurrió un error en el servidor. Inténtalo más tarde.');
}
