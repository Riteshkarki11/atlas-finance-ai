'use client';

import React, { useState } from 'react';
import TerminalSidebar from '@/components/TerminalSidebar';
import TerminalHeader from '@/components/TerminalHeader';

interface FormulaStep {
  id: string;
  stepName: string;
  metric: string;
  value: string;
  formula: string;
  secSource: string;
  note: string;
}

const AUDIT_STEPS: FormulaStep[] = [
  {
    id: 'step-1',
    stepName: '1. Unlevered Free Cash Flow (UFCF) Projection',
    metric: 'FY2025 Projected UFCF',
    value: '$32.40B',
    formula: 'UFCF = EBIT × (1 - Tax Rate) + D&A - Capital Expenditures - Δ NWC',
    secSource: 'SEC Form 10-K (Item 8: Financial Statements - Cash Flow Statement)',
    note: 'EBIT adjusted for non-recurring stock-based compensation overhead.',
  },
  {
    id: 'step-2',
    stepName: '2. Cost of Equity Calculation (CAPM)',
    metric: 'Cost of Equity (Re)',
    value: '11.85%',
    formula: 'Re = Rf + Beta × (Risk Premium)',
    secSource: '10-Yr US Treasury Yield (4.25%) + Adjusted Beta (1.45) × ERP (5.24%)',
    note: 'Blended market risk premium derived from NYU Stern Damodaran database.',
  },
  {
    id: 'step-3',
    stepName: '3. Weighted Average Cost of Capital (WACC)',
    metric: 'Blended WACC',
    value: '10.20%',
    formula: 'WACC = (E/V × Re) + [D/V × Rd × (1 - Tax Rate)]',
    secSource: 'Balance Sheet: Total Debt ($11.20B) vs. Market Equity Value ($3.41T)',
    note: 'Capital structure weighted at current market valuation (99.7% Equity / 0.3% Debt).',
  },
  {
    id: 'step-4',
    stepName: '4. Terminal Value (Gordon Growth Method)',
    metric: 'Terminal Enterprise Value',
    value: '$3.85T',
    formula: 'Terminal Value = [UFCF_n × (1 + g)] / (WACC - g)',
    secSource: 'Terminal Growth Rate (g) set conservative at 3.00% (aligned with long-term GDP growth)',
    note: 'Present value of terminal flow discounted back 5 periods at 10.20% WACC.',
  },
  {
    id: 'step-5',
    stepName: '5. Enterprise Value to Equity Value Bridge',
    metric: 'Intrinsic Value per Share',
    value: '$164.30',
    formula: 'Equity Value = Implied EV + Cash - Total Debt / Diluted Shares Outstanding',
    secSource: '10-Q Q3 Balance Sheet Cash ($34.80B) / Share Count (24.60B shares)',
    note: 'Implies an equity upside of +18.4% against market price of $138.70.',
  },
];

export default function AuditTrailPage() {
  const [selectedStep, setSelectedStep] = useState<FormulaStep>(AUDIT_STEPS[0]);

  return (
    <div className="flex min-h-screen bg-[#0D0F11] text-[#F7F6F2] font-sans">
      <TerminalSidebar />

      <div className="flex-1 flex flex-col min-w-0">
        <TerminalHeader />

        <main className="p-6 space-y-6 overflow-y-auto flex-1 font-mono text-xs">
          {/* Header */}
          <div className="border-b border-[#2D3139] pb-4 flex justify-between items-center">
            <div>
              <div className="flex items-center gap-2 text-[#8C9097] uppercase">
                <span>Verification Engine</span>
                <span>•</span>
                <span className="text-[#B8892B]">Valuation Methodology Line-Audit</span>
              </div>
              <h1 className="serif text-2xl font-bold text-white mt-1">
                DCF Audit Trail: NVDA (NVIDIA Corp.)
              </h1>
            </div>
            <div className="text-right">
              <span className="px-2.5 py-1 bg-[#1B5E4A] text-white font-bold rounded uppercase">
                Status: Audit Ready
              </span>
            </div>
          </div>

          {/* Audit Split View */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Steps List */}
            <div className="space-y-3">
              <h2 className="serif text-sm font-bold text-[#8C9097] uppercase tracking-wider">
                Valuation Waterfall Steps
              </h2>
              <div className="space-y-2">
                {AUDIT_STEPS.map((step) => {
                  const isActive = step.id === selectedStep.id;
                  return (
                    <button
                      key={step.id}
                      onClick={() => setSelectedStep(step)}
                      className={`w-full text-left p-3 border rounded-sm transition-all ${
                        isActive
                          ? 'bg-[#14171B] border-[#B8892B] text-white shadow-lg'
                          : 'bg-[#14171B]/50 border-[#2D3139] text-[#8C9097] hover:border-[#1B5E4A]'
                      }`}
                    >
                      <div className="font-semibold text-white">{step.stepName}</div>
                      <div className="flex justify-between items-center mt-2 text-[10px]">
                        <span className="text-[#B8892B]">{step.metric}</span>
                        <span className="font-bold text-white text-xs">{step.value}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right Detailed Inspector Panel */}
            <div className="lg:col-span-2 bg-[#14171B] border border-[#2D3139] p-6 rounded-sm space-y-6">
              <div>
                <span className="text-[#B8892B] uppercase text-[10px] font-bold tracking-widest block">
                  Line Inspector
                </span>
                <h2 className="serif text-xl font-bold text-white mt-1">
                  {selectedStep.stepName}
                </h2>
              </div>

              {/* Formula Render Block */}
              <div className="bg-[#0D0F11] border border-[#2D3139] p-4 rounded-sm space-y-2">
                <span className="text-[#8C9097] text-[10px] uppercase block">Mathematical Formula</span>
                <div className="text-sm font-bold text-[#7FBF9E]">{selectedStep.formula}</div>
              </div>

              {/* Source Verification Block */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-[#2D3139] p-3 rounded-sm">
                  <span className="text-[#8C9097] text-[10px] uppercase block">SEC Filing Origin</span>
                  <div className="text-white mt-1">{selectedStep.secSource}</div>
                </div>
                <div className="border border-[#2D3139] p-3 rounded-sm">
                  <span className="text-[#8C9097] text-[10px] uppercase block">Calculated Output</span>
                  <div className="text-lg font-bold text-[#B8892B] mt-0.5">{selectedStep.value}</div>
                </div>
              </div>

              {/* Methodological Notes */}
              <div className="border-t border-[#2D3139] pt-4">
                <span className="text-[#8C9097] text-[10px] uppercase block">Auditor Notes & Adjustments</span>
                <p className="text-[#C5C8D0] mt-1 leading-relaxed">
                  {selectedStep.note}
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}