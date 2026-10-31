import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = { title: 'FactorScope — Market Notebook', description: 'A personal workspace for portfolio performance, risk, and factor research.' };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body>{children}</body></html>; }
