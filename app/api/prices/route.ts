import { NextResponse } from 'next/server';
export const runtime = 'nodejs';
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const symbols = [searchParams.get('ticker') || 'AAPL', searchParams.get('benchmark') || 'SPY'];
  const range = searchParams.get('range') || '5y';
  const period = ({'1y':'1y','2y':'2y','5y':'5y','10y':'10y'} as Record<string,string>)[range] || '5y';
  try {
    const results = await Promise.all(symbols.map(async symbol => {
      const url = `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(symbol)}?range=${period}&interval=1d&events=history`;
      const response = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' }, next: { revalidate: 1800 } });
      if (!response.ok) throw new Error(`Yahoo Finance returned ${response.status} for ${symbol}`);
      const body = await response.json(); const result = body.chart?.result?.[0];
      if (!result) throw new Error(`No price history found for ${symbol}`);
      const timestamps: number[] = result.timestamp || []; const quotes = result.indicators?.adjclose?.[0]?.adjclose || result.indicators?.quote?.[0]?.close || [];
      return { symbol, points: timestamps.map((t, i) => ({ date: new Date(t * 1000).toISOString().slice(0,10), close: quotes[i] })).filter((p: {close:number|null}) => p.close != null) };
    }));
    return NextResponse.json({ asset: results[0], market: results[1] });
  } catch (error) { return NextResponse.json({ error: error instanceof Error ? error.message : 'Unable to fetch prices' }, { status: 502 }); }
}
