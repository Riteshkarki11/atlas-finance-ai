'use client';

import React from 'react';

export default function IPODesk() {
  const upcomingIpos = [
    { company: 'Hexaware Technologies', size: '₹9,950 Cr', priceBand: '₹670 - ₹708', gmp: '+₹85 (12%)', sub: '14.2x', status: 'OPEN' },
    { company: 'Hyundai Motor India', size: '₹27,870 Cr', priceBand: '₹1,860 - ₹1,960', gmp: '+₹45 (2.3%)', sub: '2.3x', status: 'CLOSED' },
    { company: 'Swiggy Limited', size: '₹11,300 Cr', priceBand: '₹371 - ₹390', gmp: '+₹22 (5.6%)', sub: '3.5x', status: 'UPCOMING' },
  ];

  const corporateActions = [
    { ticker: 'RELIANCE', type: 'Dividend', details: '₹6.00 per share', exDate: '19-Aug-2026', recordDate: '20-Aug-2026' },
    { ticker: 'TCS', type: 'Special Dividend', details: '₹10.00 per share', exDate: '05-Aug-2026', recordDate: '06-Aug-2026' },
    { ticker: 'HDFCBANK', type: 'Bonus Issue', details: '1:1 Ratio', exDate: '28-Aug-2026', recordDate: '29-Aug-2026' },
  ];

  return (
    <div className="space-y-6 font-mono text-xs">
      
      {/* 1. Primary Market / IPO Watch */}
      <div className="bg-[#14171B] border border-[#2D3139] p-5 rounded-sm space-y-4">
        <div className="flex justify-between items-center border-b border-[#2D3139] pb-3">
          <h3 className="text-sm font-bold text-[#B8892B] uppercase">
            Primary Market & DRHP Prospectus Monitor
          </h3>
          <span className="text-[10px] text-[#8C9097]">Live Subscription & Grey Market Premium (GMP)</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#0D0F11] border-b border-[#2D3139] text-[#8C9097]">
                <th className="p-3">Company Name</th>
                <th className="p-3 text-right">Issue Size</th>
                <th className="p-3 text-right">Price Band</th>
                <th className="p-3 text-right text-[#7FBF9E]">Est. GMP</th>
                <th className="p-3 text-right">Subscription</th>
                <th className="p-3 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2D3139]/40 text-[#C5C8D0]">
              {upcomingIpos.map((ipo, idx) => (
                <tr key={idx} className="hover:bg-[#1F232B] transition-colors">
                  <td className="p-3 font-bold text-white">{ipo.company}</td>
                  <td className="p-3 text-right font-mono">{ipo.size}</td>
                  <td className="p-3 text-right font-mono">{ipo.priceBand}</td>
                  <td className="p-3 text-right font-mono text-[#7FBF9E] font-bold">{ipo.gmp}</td>
                  <td className="p-3 text-right font-mono">{ipo.sub}</td>
                  <td className="p-3 text-center">
                    <span className={`text-[9px] px-2 py-0.5 rounded font-bold uppercase ${
                      ipo.status === 'OPEN' 
                        ? 'bg-[#1B5E4A]/30 text-[#7FBF9E] border border-[#1B5E4A]' 
                        : 'bg-[#0D0F11] text-[#8C9097] border border-[#2D3139]'
                    }`}>
                      {ipo.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 2. Corporate Actions Calendar */}
      <div className="bg-[#14171B] border border-[#2D3139] p-5 rounded-sm space-y-4">
        <div className="flex justify-between items-center border-b border-[#2D3139] pb-3">
          <h3 className="text-sm font-bold text-[#B8892B] uppercase">
            Corporate Actions Calendar (Dividends, Splits, Bonus)
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#0D0F11] border-b border-[#2D3139] text-[#8C9097]">
                <th className="p-3">Symbol</th>
                <th className="p-3">Action Event</th>
                <th className="p-3">Details</th>
                <th className="p-3 text-right">Ex-Date</th>
                <th className="p-3 text-right">Record Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2D3139]/40 text-[#C5C8D0]">
              {corporateActions.map((action, idx) => (
                <tr key={idx} className="hover:bg-[#1F232B] transition-colors">
                  <td className="p-3 font-bold text-white">{action.ticker}</td>
                  <td className="p-3 text-[#B8892B] font-semibold">{action.type}</td>
                  <td className="p-3">{action.details}</td>
                  <td className="p-3 text-right font-mono text-white">{action.exDate}</td>
                  <td className="p-3 text-right font-mono text-[#8C9097]">{action.recordDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}