'use client';

import React from 'react';
import { exportToCSV } from '@/utils/exportUtils';

export default function Footer() {
  const handleExport = () => {
    exportToCSV('NVDA', 164.30, 10.2);
  };

  return (
    <footer className="mt-20 border-t border-[#DBDAD2] pt-8 pb-12 bg-white/40 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <div className="w-5 h-5 border-[1.5px] border-[#14171B] flex items-end p-0.5 gap-0.5">
            <span className="w-1 h-1 bg-[#1B5E4A]"></span>
            <span className="w-1 h-2 bg-[#1B5E4A]"></span>
            <span className="w-1 h-3 bg-[#B8892B]"></span>
          </div>
          <span className="serif font-semibold text-lg">Atlas Finance AI</span>
          <span className="mono text-xs text-[#4A4E52] ml-2">© {new Date().getFullYear()}</span>
        </div>

        <div className="flex items-center gap-2 px-3 py-1 bg-white border border-[#DBDAD2] text-xs mono">
          <span className="w-2 h-2 rounded-full bg-[#1B5E4A] animate-pulse"></span>
          <span className="text-[#4A4E52]">DCF Engine:</span>
          <span className="font-semibold text-[#0F3B2E]">OPERATIONAL</span>
        </div>

        <div className="flex items-center gap-3 text-xs mono">
          <button 
            onClick={handleExport}
            className="px-3 py-1.5 border border-[#14171B] bg-white hover:bg-[#14171B] hover:text-[#F7F6F2] transition-colors font-medium cursor-pointer"
          >
            Export Model (CSV)
          </button>
        </div>
      </div>
    </footer>
  );
}