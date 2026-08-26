This is a [Next.js](https://nextjs.org) Baby Pleats storefront.

## Catalog API (separate project)

The NestJS backend lives in its **own repo** (not this one). This site reads products and categories from that API.

1. Start the API in the other project (default local base: `http://localhost:4000/v1`).
2. In this repo:

```bash
cp .env.local.example .env.local
# set NEXT_PUBLIC_API_BASE_URL to your API, e.g. http://localhost:4000/v1
npm run dev
```

Production: set `NEXT_PUBLIC_API_BASE_URL` to the deployed API (e.g. `https://api.babypleats.com/v1`).

Contract & seed shapes for the API team: [`docs/`](docs/README.md).

Offline / build fallback (when the API is unreachable): [`src/data/catalog.fallback.json`](src/data/catalog.fallback.json).

## Getting Started

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy

Static export → GitHub Pages (see `.github/workflows/deploy.yml`). The build needs either a reachable `NEXT_PUBLIC_API_BASE_URL` or the local fallback JSON.
