# FactorScope — Market Notebook

A hands-on multi-asset research workspace built with Next.js, React, TypeScript, and Yahoo Finance data. Explore portfolio behavior, compare risk models, and save useful research notes.

## Features

- Portfolio baskets with up to eight tickers, user-adjustable weights, cumulative growth, and benchmark comparison.
- CAPM, Fama–French 3-factor, Carhart 4-factor, and configurable seven-column factor regression.
- Factor CSV upload with date alignment, beta standard error, t-statistic, alpha, and R-squared diagnostics.
- Annualized volatility, Sharpe ratio, maximum drawdown, worst calendar month, and 60-day rolling beta.
- Beta-based market shock scenarios and a long-only minimum-variance allocation suggestion.
- Browser-local watchlist with add-to-basket and remove actions; saved runs retain the analysis setup and can be restored or deleted.
- Downloadable CSV report of metrics and daily returns.
- Vercel-compatible Next.js API route for Yahoo Finance adjusted close history.

## Run locally

Requires Node.js 20 or later.

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Deploy to Vercel

Push the repository to GitHub, import it in Vercel, and deploy using the detected Next.js defaults. No secrets are required. The API route fetches Yahoo Finance chart data server-side; requests remain subject to Yahoo's availability and rate limits.

## Factor CSV

Use a `Date` column and daily factor columns as applicable: `SMB`, `HML`, `Mom`, `STR`, `BOND`, `CREDIT`. Returns must be percent values (0.25 means 0.25%). The market excess return `Mkt-RF` is derived from the selected benchmark minus the risk-free rate. Rows need exact daily date alignment with market observations. Sample format is in `data/sample_factors.csv`.

The Fung–Hsieh option is a configurable factor regression scaffold; the generic column names do not reproduce the canonical Fung–Hsieh strategy factor construction. This repository does not redistribute third-party factor data.

## Persistence and interpretation

Watchlists and saved run labels are stored in the current browser's local storage. No user authentication, hosted database, or cross-device synchronization is configured. Portfolio optimization minimizes historical variance with long-only weights; it is not a return-maximizing recommendation. Regression, stress scenario, and historical risk statistics are estimates based on past data and are not forecasts or investment advice.

## Security

The project pins Next.js 15 to patched release 15.5.28, following the [official Next.js security update](https://nextjs.org/blog/nextjs-security-update-october-14-2026).
