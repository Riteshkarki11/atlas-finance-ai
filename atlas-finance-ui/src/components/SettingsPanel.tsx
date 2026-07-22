'use client';

import React, { useState } from 'react';

export default function SettingsPanel() {
  const [riskFreeRate, setRiskFreeRate] = useState(4.25);
  const [erp, setErp] = useState(5.5);
  const [currency, setCurrency] = useState('USD ($)');

  return (
    <section className="mt-16 border-t border-[#DBDAD2] pt-12">
      <div className="mb-8">
        <div className="mono text-xs uppercase tracking-widest text-[#0F3B2E] mb-1">
          Global Model Configuration
        </div>
        <h2 className="serif text-3xl font-semibold">Valuation Parameters & Risk Settings</h2>
      </div>

      <div className="hazy-card shadow-[6px_6px_0_#0F3B2E] p-6 grid grid-cols-1 md:grid-cols-3 gap-6 text-xs mono">
        <div className="p-4 bg-white/70 border border-[#DBDAD2] space-y-2">
          <label className="text-[#4A4E52] uppercase block font-semibold">Risk-Free Rate (10Y Yield)</label>
          <input
            type="number"
            step="0.05"
            value={riskFreeRate}
            onChange={(e) => setRiskFreeRate(parseFloat(e.target.value))}
            className="w-full p-2 bg-white border border-[#14171B] font-bold text-[#0F3B2E]"
          />
          <p className="text-[10px] text-[#4A4E52]">Base benchmark rate for CAPM Cost of Equity computation.</p>
        </div>

        <div className="p-4 bg-white/70 border border-[#DBDAD2] space-y-2">
          <label className="text-[#4A4E52] uppercase block font-semibold">Equity Risk Premium (ERP)</label>
          <input
            type="number"
            step="0.1"
            value={erp}
            onChange={(e) => setErp(parseFloat(e.target.value))}
            className="w-full p-2 bg-white border border-[#14171B] font-bold text-[#0F3B2E]"
          />
          <p className="text-[10px] text-[#4A4E52]">Damodaran implied market risk premium standard.</p>
        </div>

        <div className="p-4 bg-white/70 border border-[#DBDAD2] space-y-2">
          <label className="text-[#4A4E52] uppercase block font-semibold">Display Currency</label>
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            className="w-full p-2 bg-white border border-[#14171B] font-bold text-[#0F3B2E] cursor-pointer"
          >
            <option>USD ($)</option>
            <option>EUR (€)</option>
            <option>GBP (£)</option>
            <option>INR (₹)</option>
          </select>
          <p className="text-[10px] text-[#4A4E52]">Automatic conversion for reports and exported files.</p>
        </div>
      </div>
    </section>
  );
}