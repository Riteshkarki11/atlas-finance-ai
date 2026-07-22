'use client';

import React, { useState } from 'react';

const AUDIT_LOGS = [
  {
    step: '01',
    title: 'Revenue Projection Engine',
    status: 'Verified',
    detail: 'Extracted 3-year historical CAGR (43.8%) from SEC 10-K filings. Applied conservative decay factor (-5% per annum) for terminal year projection.',
    formula: 'Rev_t = Rev_{t-1} * (1 + g_t)',
  },
  {
    step: '02',
    title: 'WACC & Discount Matrix Calculation',
    status: 'Verified',
    detail: 'Derived Cost of Equity using CAPM (Risk-Free Rate: 4.25%, Equity Risk Premium: 5.5%, Beta: 1.15). Cost of Debt post-tax calculated at 3.8%.',
    formula: 'WACC = (E/V * Re) + (D/V * Rd * (1 - Tc))',
  },
  {
    step: '03',
    title: 'Terminal Value & Enterprise Value Synthesis',
    status: 'Calibrated',
    detail: 'Used Perpetual Growth Model (g = 3.0%). Terminal value discounted back 5 years to Present Value.',
    formula: 'TV = (FCF_n * (1 + g)) / (WACC - g)',
  },
];

export default function SignalAuditTrail() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section className="mt-16 border-t border-[#DBDAD2] pt-12 pb-16">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <div className="mono text-xs uppercase tracking-widest text-[#0F3B2E] mb-1">
            Explainable AI Engine
          </div>
          <h2 className="serif text-3xl font-semibold">Signal Rationale & Audit Trail</h2>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Signal Status Box */}
        <div className="hazy-card shadow-[6px_6px_0_#0F3B2E] p-6 space-y-4">
          <div className="mono text-xs text-[#4A4E52] uppercase border-b border-[#DBDAD2] pb-2 flex justify-between">
            <span>Signal Output</span>
            <span className="text-[#1B5E4A] font-semibold">Confidence: 91%</span>
          </div>

          <div className="p-4 bg-[#1B5E4A]/10 border border-[#1B5E4A]">
            <span className="mono text-xs uppercase tracking-wider text-[#0F3B2E] font-semibold block mb-1">
              Primary Signal
            </span>
            <div className="serif text-4xl font-bold text-[#1B5E4A]">OVERWEIGHT</div>
            <p className="text-xs text-[#4A4E52] mt-2">
              Implied intrinsic upside of <span className="mono font-semibold text-[#14171B]">+18.4%</span> relative to current trading price.
            </p>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex justify-between border-b border-dashed border-[#DBDAD2] pb-1.5">
              <span className="text-[#4A4E52]">Target Valuation:</span>
              <span className="mono font-semibold">$164.30</span>
            </div>
            <div className="flex justify-between border-b border-dashed border-[#DBDAD2] pb-1.5">
              <span className="text-[#4A4E52]">Current Price:</span>
              <span className="mono font-semibold">$138.70</span>
            </div>
            <div className="flex justify-between pb-1.5">
              <span className="text-[#4A4E52]">Risk Rating:</span>
              <span className="mono font-semibold text-[#B8892B]">MODERATE</span>
            </div>
          </div>
        </div>

        {/* Interactive Audit Trail Log */}
        <div className="lg:col-span-2 hazy-card shadow-[6px_6px_0_#0F3B2E] p-6">
          <div className="mono text-xs text-[#4A4E52] uppercase mb-4 border-b border-[#DBDAD2] pb-2">
            Step-by-Step Model Audit Logs
          </div>

          <div className="space-y-4">
            {AUDIT_LOGS.map((log, idx) => (
              <div
                key={log.step}
                onClick={() => setActiveStep(idx)}
                className={`p-4 border transition-all cursor-pointer ${
                  activeStep === idx
                    ? 'border-[#14171B] bg-white shadow-sm'
                    : 'border-[#DBDAD2] bg-white/40 hover:bg-white/70'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <span className="mono text-xs font-bold text-[#0F3B2E] bg-[#1B5E4A]/10 px-2 py-0.5 border border-[#1B5E4A]/30">
                      STEP {log.step}
                    </span>
                    <h4 className="serif font-semibold text-base">{log.title}</h4>
                  </div>
                  <span className="mono text-[10px] uppercase font-semibold text-[#1B5E4A] bg-[#1B5E4A]/10 px-2 py-0.5 rounded-xs">
                    {log.status}
                  </span>
                </div>

                <p className="text-xs text-[#4A4E52] mb-3 leading-relaxed">
                  {log.detail}
                </p>

                <div className="p-2 bg-[#F7F6F2] border border-[#DBDAD2] mono text-[11px] text-[#0F3B2E]">
                  <span className="text-[#4A4E52] mr-2">Formula:</span>
                  {log.formula}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}