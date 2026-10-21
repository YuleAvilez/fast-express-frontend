import type { QuoteResult } from '../types';

const money = (n: number, c: string) =>
  new Intl.NumberFormat('es-EC', { style: 'currency', currency: c }).format(n);

export default function ResultCard({ result }: { result: QuoteResult | null }) {
  if (!result) {
    return (
      <div className="flex h-full min-h-[260px] flex-col justify-center rounded-2xl border border-dashed border-ink-200 p-8 text-center">
        <p className="font-display text-lg font-bold text-ink-800">Tu cotización aparecerá aquí</p>
        <p className="mx-auto mt-1 max-w-xs text-sm text-ink-600">
          Completa los datos del paquete y calcula el costo de envío al instante.
        </p>
      </div>
    );
  }
  const rows: [string, number, boolean?][] = [
    ['Tarifa base por peso', result.baseCost],
    ['Recargo por envío Express', result.shipmentSurcharge],
    ['Descuento por tipo de cliente', -result.discount, true],
  ];
  return (
    <div className="rounded-2xl bg-ink-900 p-8 text-white" role="status" data-testid="result-card">
      <p className="text-sm text-ink-200">Costo total del envío</p>
      <p className="mt-1 font-display text-5xl font-extrabold tracking-tight text-route-500" data-testid="total">
        {money(result.total, result.currency)}
      </p>
      <dl className="mt-6 divide-y divide-white/10 text-sm">
        {rows.filter(([, v]) => v !== 0).map(([k, v, good]) => (
          <div key={k} className="flex justify-between py-2.5">
            <dt className="text-ink-200">{k}</dt>
            <dd className={good ? 'text-route-500' : ''}>{money(v, result.currency)}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
