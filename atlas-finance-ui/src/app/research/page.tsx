'use client';

import React, { useState } from 'react';
import TerminalSidebar from '@/components/TerminalSidebar';
import TerminalHeader from '@/components/TerminalHeader';

interface PromptPreset {
  title: string;
  query: string;
  category: string;
}

const PRESETS: PromptPreset[] = [
  { title: 'DCF Intrinsic Valuation', query: 'Build a 5-year DCF model for NVDA assuming 18% revenue growth and 9.5% WACC.', category: 'VALUATION' },
  { title: 'LBO Buyout Analysis', query: 'Evaluate LBO debt structure and IRR returns for Dell Technologies at 11x EBITDA.', category: 'PRIVATE EQUITY' },
  { title: 'Peer Financial Comparison', query: 'Compare profit margins, ROIC, and debt ratios of Apple vs Microsoft vs Alphabet.', category: 'COMPS' },
  { title: 'M&A Accretion/Dilution', query: 'Model a 30% premium stock/cash acquisition of AMD by Broadcom.', category: 'M&A' },
];

export default function AIResearchPage() {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant'; content: string }>>([
    {
      role: 'assistant',
      content: 'Welcome to the **Atlas AI Investment Research Desk**. I am connected directly to live ticker feeds, multi-statement financials, and institutional DCF/LBO models. How can I assist your deal team today?',
    },
  ]);

  const handleSend = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!prompt.trim() || loading) return;

    const userMsg = prompt.trim();
    setPrompt('');
    setMessages((prev) => [...prev, { role: 'user', content: userMsg }]);
    setLoading(true);

    // Simulated Deep Institutional Analysis Response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: `### Executive Analysis: ${userMsg}\n\n` +
            `**1. Fundamental Synthesis**\n` +
            `Our quantitative model cross-referenced SEC 10-K disclosures, consensus estimates, and macro yield curve shifts.\n\n` +
            `* **DCF Intrinsic Value:** Implied valuation indicates a **16.4% upside** under base-case revenue CAGR assumptions.\n` +
            `* **Operating Margins:** Gross margins remain resilient at ~72.4%, supported by enterprise software pricing power.\n` +
            `* **Capital Structure Risk:** Net Leverage ratio stands at **0.12x EBITDA**, placing the firm in the top decile for balance sheet health.\n\n` +
            `**2. Deal Team Recommendation**\n` +
            `> **CONVICTION: OVERWEIGHT.** High free cash flow conversion coupled with ROIC exceeding 38% justifies present valuation multiples. Suggest running sensitivity analysis in the Modeling Desk.`,
        },
      ]);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="flex min-h-screen bg-[#0D0F11] text-[#F7F6F2] font-sans">
      <TerminalSidebar />

      <div className="flex-1 flex flex-col min-w-0">
        <TerminalHeader />

        <main className="p-6 space-y-6 flex-1 flex flex-col min-h-0">
          {/* Workspace Title Header */}
          <div className="flex justify-between items-center border-b border-[#2D3139] pb-4">
            <div>
              <div className="flex items-center gap-2 text-xs mono text-[#8C9097] uppercase">
                <span>AI Workbench</span>
                <span>•</span>
                <span className="text-[#B8892B]">Natural Language Copilot</span>
              </div>
              <h1 className="serif text-2xl font-bold text-white mt-1">
                AI Investment Research Desk
              </h1>
            </div>
          </div>

          {/* Prompt Presets */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs mono">
            {PRESETS.map((preset) => (
              <button
                key={preset.title}
                onClick={() => setPrompt(preset.query)}
                className="p-3 bg-[#14171B] border border-[#2D3139] hover:border-[#1B5E4A] rounded text-left transition-colors"
              >
                <span className="text-[9px] text-[#B8892B] font-bold block uppercase mb-1">{preset.category}</span>
                <span className="font-bold text-white block mb-1">{preset.title}</span>
                <span className="text-[10px] text-[#8C9097] line-clamp-1">{preset.query}</span>
              </button>
            ))}
          </div>

          {/* Chat Feed */}
          <div className="flex-1 bg-[#14171B] border border-[#2D3139] rounded p-4 overflow-y-auto space-y-4 text-xs font-mono">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-3xl p-4 rounded ${
                    msg.role === 'user'
                      ? 'bg-[#1B5E4A] text-white'
                      : 'bg-[#0D0F11] border border-[#2D3139] text-[#C5C8D0] leading-relaxed'
                  }`}
                >
                  <div className="text-[10px] uppercase font-bold mb-2 text-[#8C9097]">
                    {msg.role === 'user' ? 'ANALYST PROMPT' : 'ATLAS AI ENGINE'}
                  </div>
                  <div className="whitespace-pre-wrap">{msg.content}</div>
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex gap-2 items-center text-xs mono text-[#B8892B]">
                <span className="w-2 h-2 rounded-full bg-[#B8892B] animate-ping"></span>
                Executing financial model query & fetching live backend data...
              </div>
            )}
          </div>

          {/* Prompt Input Area */}
          <form onSubmit={handleSend} className="flex gap-2 text-xs mono">
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Ask Atlas AI (e.g., 'Is Apple undervalued?', 'Create DCF for MSFT', 'Compare HDFC and ICICI')..."
              className="flex-1 p-3 bg-[#14171B] border border-[#2D3139] rounded text-white focus:outline-none focus:border-[#1B5E4A]"
            />
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 bg-[#1B5E4A] hover:bg-[#144738] text-white font-bold uppercase rounded transition-colors disabled:opacity-50"
            >
              Run Query
            </button>
          </form>
        </main>
      </div>
    </div>
  );
}