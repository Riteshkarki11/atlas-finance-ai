import type { Metadata } from 'next';
import { Geist_Mono } from 'next/font/google';
import './globals.css';

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Atlas Terminal | Institutional AI Finance Desk',
  description: 'AI-Powered Valuation Engine, DCF Modeling, and SEC Filings Audit Workstation.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistMono.variable} antialiased bg-[#0D0F11] text-[#F7F6F2] font-mono min-h-screen flex flex-col selection:bg-[#1B5E4A] selection:text-white`}
      >
        {/* Top Ticker Marquee Bar */}
        <div className="bg-[#14171B] border-b border-[#2D3139] text-[11px] py-1 px-4 flex justify-between items-center z-40 text-[#8C9097] select-none">
          <div className="flex items-center gap-4 overflow-hidden whitespace-nowrap">
            <span className="flex items-center gap-1.5 font-bold text-white">
              <span className="w-2 h-2 rounded-full bg-[#1B5E4A] animate-pulse"></span>
              LIVE FEED
            </span>
            <span className="text-[#2D3139]">|</span>
            <span>NVDA <span className="text-[#7FBF9E]">$138.70 (+1.77%)</span></span>
            <span>MSFT <span className="text-[#7FBF9E]">$448.90 (+0.95%)</span></span>
            <span>AAPL <span className="text-[#D98E85]">$224.30 (-0.42%)</span></span>
            <span>AMZN <span className="text-[#7FBF9E]">$186.50 (+1.20%)</span></span>
            <span>US10Y <span className="text-[#B8892B]">4.28% (+2 bps)</span></span>
          </div>
          <div className="hidden md:flex items-center gap-3 text-[10px]">
            <span>ENGINE: <strong className="text-[#7FBF9E]">ACTIVE</strong></span>
            <span>LATENCY: <strong className="text-white">14ms</strong></span>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-h-0 terminal-grid">
          {children}
        </div>
      </body>
    </html>
  );
}