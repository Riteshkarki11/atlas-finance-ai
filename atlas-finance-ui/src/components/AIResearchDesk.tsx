'use client';

import React, { useState } from 'react';

interface AIResearchDeskProps {
  ticker: string;
}

export default function AIResearchDesk({ ticker }: AIResearchDeskProps) {
  const [activeSubTab, setActiveSubTab] = useState<'thesis' | 'risks' | 'transcripts'>('thesis');
  const [query, setQuery] = useState('');
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Mocked AI-generated fundamental synthesis
  const investmentThesis = {
    summary: `Strong long-term compounder with market-leading positions across telecom (Jio), retail (RRVL), and refining/O2C. Transitioning into high-margin New Energy (solar PV, green hydrogen, and battery storage) provides a multi-decade growth runway.`,
    bullCatalysts: [
      'Subscriber ARPU expansion and rapid scale-up of 5G fixed-wireless broadband (JioAirFiber).',
      'Hyperlocal quick-commerce integration scaling across 20,000+ retail stores.',
      'Commissioning of giga-factories for solar PV modules and green hydrogen electrolyzers.',
      'De-leveraging balance sheet with Net Debt to EBITDA remaining well under 1.0x.'
    ],
    keyBearRisks: [
      'Macro volatility in global refining cracks (GRMs) and petrochemical spreads affecting O2C margins.',
      'High capital expenditures (CapEx) in New Energy before significant cash generation begins.',
      'Potential delays in listing consumer subsidiaries (Jio Platforms & Reliance Retail).'
    ]
  };

  const handleRunAiQuery = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsAnalyzing(true);
    setAiResponse(null);

    setTimeout(() => {
      setIsAnalyzing(false);
      setAiResponse(
        `Based on the latest FY26 filings and earnings call transcripts: Management highlighted an 18% YoY growth in Jio's EBITDA, driven by 5G user migration. Capex intensity for 5G rollout has peaked, and cash flow generation from retail operations (₹27,033 Cr EBITDA) is helping fund initial green hydrogen development.`
      );
    }, 1200);
  };

  return (
    <div className="space-y-6 font-mono text-xs">
      
      {/* 1. Header & AI Assistant Bar */}
      <div className="bg-[#14171B] border border-[#2D3139] p-5 rounded-sm space-y-4">
        <div className="flex justify-between items-center border-b border-[#2D3139] pb-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-[#B8892B] rounded-full animate-pulse"></span>
            <h3 className="text-sm font-bold text-white uppercase">
              AI Investment Desk & Document RAG ({ticker})
            </h3>
          </div>
          <span className="text-[10px] text-[#7FBF9E] bg-[#1B5E4A]/30 border border-[#1B5E4A] px-2 py-0.5 rounded uppercase font-bold">
            LLM Vector Search Active
          </span>
        </div>

        {/* Prompt Input Box */}
        <form onSubmit={handleRunAiQuery} className="flex gap-2">
          <input
            type="text"
            placeholder="Ask AI (e.g. 'Summarize guidance on New Energy Capex & ARPU trajectory')..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-[#0D0F11] border border-[#2D3139] px-4 py-2 text-white placeholder-[#8C9097] focus:outline-none focus:border-[#B8892B] rounded-sm"
          />
          <button
            type="submit"
            disabled={isAnalyzing}
            className="bg-[#B8892B] hover:bg-[#D4A038] text-black font-bold px-5 py-2 rounded-sm transition-colors"
          >
            {isAnalyzing ? 'Analyzing...' : 'Synthesize'}
          </button>
        </form>

        {aiResponse && (
          <div className="bg-[#0D0F11] border border-[#B8892B]/50 p-4 rounded-sm text-[#C5C8D0] space-y-2">
            <span className="text-[10px] text-[#B8892B] uppercase font-bold block">AI RAG Response:</span>
            <p className="leading-relaxed">{aiResponse}</p>
          </div>
        )}
      </div>

      {/* 2. Structured Fundamental Thesis Module */}
      <div className="bg-[#14171B] border border-[#2D3139] rounded-sm p-5 space-y-4">
        
        {/* Navigation Tabs */}
        <div className="flex bg-[#0D0F11] border border-[#2D3139] rounded-sm p-1 w-fit">
          <button
            onClick={() => setActiveSubTab('thesis')}
            className={`px-4 py-1.5 rounded-sm transition-colors ${
              activeSubTab === 'thesis' ? 'bg-[#B8892B] text-black font-bold' : 'text-[#8C9097] hover:text-white'
            }`}
          >
            Investment Thesis
          </button>
          <button
            onClick={() => setActiveSubTab('risks')}
            className={`px-4 py-1.5 rounded-sm transition-colors ${
              activeSubTab === 'risks' ? 'bg-[#B8892B] text-black font-bold' : 'text-[#8C9097] hover:text-white'
            }`}
          >
            Risk Matrix
          </button>
          <button
            onClick={() => setActiveSubTab('transcripts')}
            className={`px-4 py-1.5 rounded-sm transition-colors ${
              activeSubTab === 'transcripts' ? 'bg-[#B8892B] text-black font-bold' : 'text-[#8C9097] hover:text-white'
            }`}
          >
            Earnings Transcript Highlights
          </button>
        </div>

        {/* Content Panel */}
        {activeSubTab === 'thesis' && (
          <div className="space-y-4">
            <div className="p-4 bg-[#0D0F11] border border-[#2D3139] rounded-sm">
              <span className="text-[10px] text-[#8C9097] block uppercase font-bold mb-1">Executive Summary</span>
              <p className="text-white text-xs leading-relaxed">{investmentThesis.summary}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-[#0D0F11] border border-[#1B5E4A] p-4 rounded-sm space-y-2">
                <span className="text-[#7FBF9E] font-bold uppercase block text-xs">Key Growth Drivers (Bull Case)</span>
                <ul className="list-disc list-inside space-y-1.5 text-[#C5C8D0]">
                  {investmentThesis.bullCatalysts.map((cat, i) => (
                    <li key={i}>{cat}</li>
                  ))}
                </ul>
              </div>

              <div className="bg-[#0D0F11] border border-[#E55353]/50 p-4 rounded-sm space-y-2">
                <span className="text-[#E55353] font-bold uppercase block text-xs">Primary Risk Factors (Bear Case)</span>
                <ul className="list-disc list-inside space-y-1.5 text-[#C5C8D0]">
                  {investmentThesis.keyBearRisks.map((risk, i) => (
                    <li key={i}>{risk}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeSubTab === 'risks' && (
          <div className="bg-[#0D0F11] border border-[#2D3139] p-4 rounded-sm">
            <h4 className="text-white font-bold mb-2">Automated Risk Scoring (Scale 1-10)</h4>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-[#C5C8D0] mb-1">
                  <span>Commodity/Margin Volatility Risk</span>
                  <span className="text-[#E55353] font-bold">7.2 / 10</span>
                </div>
                <div className="w-full bg-[#1F232B] h-2 rounded-full overflow-hidden">
                  <div className="bg-[#E55353] h-full w-[72%]"></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-[#C5C8D0] mb-1">
                  <span>Leverage & Debt Coverage Risk</span>
                  <span className="text-[#7FBF9E] font-bold">2.4 / 10</span>
                </div>
                <div className="w-full bg-[#1F232B] h-2 rounded-full overflow-hidden">
                  <div className="bg-[#7FBF9E] h-full w-[24%]"></div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeSubTab === 'transcripts' && (
          <div className="bg-[#0D0F11] border border-[#2D3139] p-4 rounded-sm space-y-3">
            <span className="text-[10px] text-[#B8892B] font-bold uppercase">Management Call Takeaways (Q4 FY26)</span>
            <p className="text-[#C5C8D0] leading-relaxed">
              "Capital expenditure for FY26 stood at ₹144,271 crore, reflecting reduced 5G spending and reallocation towards green energy giga-factories. Consolidated EBITDA expanded 13.4% YoY to ₹207,911 crore with net debt-to-EBITDA maintained at a safe 0.60x level."
            </p>
          </div>
        )}

      </div>
    </div>
  );
}