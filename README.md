# FastExpress - Frontend (React + TypeScript + Tailwind)

## Ejecutar
```bash
npm install
npm run dev            # http://localhost:5173
npm test               # pruebas unitarias de validación (Vitest)
npm run test:coverage  # reporte de cobertura
```

## Backend
- `VITE_USE_MOCK=true` (por defecto): cálculo simulado local que imita respuestas 422 del servidor.
- `VITE_USE_MOCK=false`: llama a `POST {VITE_API_URL}/api/quotes` con `{ weightKg, clientType, shipmentType }`.
  Espera `200` con `{ baseCost, shipmentSurcharge, discount, total, currency }`
  y `400/422` con `{ message, errors?: { weight?, clientType?, shipmentType? } }`.

## Reglas de negocio
Todo está centralizado en `src/config/businessRules.ts`. Los tipos de cliente (BR-03) y de envío (BR-04),
y las tarifas del mock en `src/lib/api.ts`, son supuestos: ajústalos a su documento de requisitos.

## Mapeo con la guía (Sección C)
| Requisito de la guía | Dónde está |
|---|---|
| Validación en cliente como usabilidad, no seguridad | `lib/validation.ts` + el backend vuelve a validar; el cliente muestra errores del servidor (`QuoteForm`, `api.ts`) |
| Retroalimentación visual al superar BR-02 (20 kg) | Borde rojo, mensaje con `role="alert"`, medidor `WeightGauge` en rojo, mensaje con la salida |
| Límites BVA 5.00 / 5.01 / 20.00 kg | `validation.test.ts` y `weightBand()` |
| Evidencia para QA | atributos `data-testid` en inputs, errores y resultado |
