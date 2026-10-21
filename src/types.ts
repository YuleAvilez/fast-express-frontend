import type { ClientType, ShipmentType } from './config/businessRules';

export interface QuoteRequest {
  weightKg: number;
  clientType: ClientType;
  shipmentType: ShipmentType;
}

export interface QuoteResult {
  baseCost: number;
  shipmentSurcharge: number;
  discount: number;
  total: number;
  currency: string;
}
