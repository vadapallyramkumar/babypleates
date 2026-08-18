# Baby Pleats API docs

Design-only contract for the external backend (v1.1 — size/color variants). Product page uses local variants; full API wiring remains Phase C.

| File | Purpose |
|---|---|
| [api-contract.md](./api-contract.md) | Human-readable v1 contract, envelopes, roadmap |
| [openapi.yaml](./openapi.yaml) | OpenAPI 3.0 specification |
| [catalog.seed.json](./catalog.seed.json) | Corrected seed categories + products |
| [schemas/category.json](./schemas/category.json) | JSON Schema — Category |
| [schemas/product.json](./schemas/product.json) | JSON Schema — Product |
| [schemas/order.json](./schemas/order.json) | JSON Schema — Order |

## Phases (summary)

1. **Now** — Contract frozen (this folder)
2. **A** — Backend skeleton (public GETs + seed)
3. **B** — Admin portal MVP (auth, CRUD, orders list)
4. **C** — Storefront integration (replace `src/data/*`)
5. **D** — Orders automation (website create + optional WhatsApp)
