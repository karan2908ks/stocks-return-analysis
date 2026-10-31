import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = { title: 'Factor Lab — Stock Returns', description: 'Explore stock performance and factor model returns.' };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body>{children}</body></html>; }
