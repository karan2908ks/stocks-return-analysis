import { NextResponse } from 'next/server';
export const runtime = 'nodejs';
type PricePoint = { date: string; close: number };
async function fetchSeries(symbol: string, range: string) {
  const url = `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(symbol)}?range=${range}&interval=1d&events=history`;
  const response = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' }, next: { revalidate: 1800 } });
  if (!response.ok) throw new Error(`Yahoo Finance returned ${response.status} for ${symbol}`);
  const body = await response.json(); const result = body.chart?.result?.[0];
  if (!result) throw new Error(`No price history found for ${symbol}`);
  const times: number[] = result.timestamp || []; const prices: number[] = result.indicators?.adjclose?.[0]?.adjclose || result.indicators?.quote?.[0]?.close || [];
  return { symbol, points: times.map((t, i) => ({ date: new Date(t * 1000).toISOString().slice(0, 10), close: prices[i] })).filter((p: PricePoint) => Number.isFinite(p.close)) };
}
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url); const range = searchParams.get('range') || '5y';
  const allowed = ['1y', '2y', '5y', '10y']; const period = allowed.includes(range) ? range : '5y';
  const symbols = Array.from(new Set((searchParams.get('tickers') || 'AAPL').split(',').map(s => s.trim().toUpperCase()).filter(Boolean))).slice(0, 8);
  const benchmark = (searchParams.get('benchmark') || 'SPY').trim().toUpperCase();
  if (!symbols.length || symbols.some(s => !/^[A-Z0-9.^=-]{1,16}$/.test(s)) || !/^[A-Z0-9.^=-]{1,16}$/.test(benchmark)) return NextResponse.json({ error: 'Enter valid ticker symbols.' }, { status: 400 });
  try { const [assets, market] = await Promise.all([Promise.all(symbols.map(s => fetchSeries(s, period))), fetchSeries(benchmark, period)]); return NextResponse.json({ assets, market }); }
  catch (error) { return NextResponse.json({ error: error instanceof Error ? error.message : 'Unable to fetch prices' }, { status: 502 }); }
}
