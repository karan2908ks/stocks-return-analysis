# Stocks Return Analysis

A responsive Next.js dashboard for stock performance and CAPM / factor-model analysis. It fetches adjusted daily prices from Yahoo Finance through a server-side route and accepts user-supplied factor returns.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Deploy to Vercel

1. Push this repository to GitHub.
2. In Vercel, select **Add New → Project**, import the repository, and keep the detected Next.js defaults.
3. Deploy. No environment variables are required.

Alternatively, install the Vercel CLI and run `vercel` from this project directory. The API route proxies Yahoo chart data; availability is subject to Yahoo Finance service limits.

## Factor data

For models beyond CAPM, upload a CSV with daily observations and columns named `Date`, `SMB`, `HML`, `Mom`, `STR`, `BOND`, `CREDIT`. Rows must align with daily price return dates. Factor returns should be in percentage units. The market excess factor (`Mkt-RF`) is derived from the benchmark return and risk-free rate. The seven-factor option uses configurable generic columns; it is not a canonical Fung–Hsieh data implementation. Example format: `data/sample_factors.csv`.

## Stack

Next.js App Router, React, TypeScript, Lucide icons, Yahoo Finance chart endpoint. See `package.json` for dependencies.
