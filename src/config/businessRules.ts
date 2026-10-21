/**
 * Reglas de negocio de FastExpress.
 * IMPORTANTE: ajusta estos valores a los del documento de requisitos de tu equipo.
 * Los valores de peso (5.00 / 5.01 / 20.00 kg) salen de la Guía de Trabajo (BR-02).
 */
export const RULES = {
  /** BR-02: peso mínimo aceptado (kg) */
  WEIGHT_MIN: 0.01,
  /** BR-02: el peso hasta este valor pertenece a la banda liviana */
  WEIGHT_LIGHT_MAX: 5.0,
  /** BR-02: peso máximo aceptado (kg). Sobre este valor el envío se rechaza */
  WEIGHT_MAX: 20.0,
  WEIGHT_DECIMALS: 2,
} as const;

/** BR-03: tipos de cliente (supuesto, ajustar) */
export const CLIENT_TYPES = [
  { value: 'REGULAR', label: 'Regular', hint: 'Tarifa estándar' },
  { value: 'PREMIUM', label: 'Premium', hint: '10 % de descuento' },
  { value: 'CORPORATIVO', label: 'Corporativo', hint: '15 % de descuento' },
] as const;

/** BR-04: tipos de envío (supuesto, ajustar) */
export const SHIPMENT_TYPES = [
  { value: 'ESTANDAR', label: 'Estándar', hint: 'Entrega en 3 a 5 días' },
  { value: 'EXPRESS', label: 'Express', hint: 'Entrega en 24 horas' },
] as const;

export type ClientType = (typeof CLIENT_TYPES)[number]['value'];
export type ShipmentType = (typeof SHIPMENT_TYPES)[number]['value'];
