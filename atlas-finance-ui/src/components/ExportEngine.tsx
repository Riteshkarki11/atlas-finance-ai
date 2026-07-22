'use client';

import React from 'react';

interface ExportEngineProps {
  filename: string;
  data: Record<string, any>[];
}

export default function ExportEngine({ filename, data }: ExportEngineProps) {
  const exportToCSV = () => {
    if (!data || !data.length) return;

    // Extract headers
    const headers = Object.keys(data[0]);
    const csvRows: string[] = [];

    // Add Header Row
    csvRows.push(headers.join(','));

    // Add Data Rows
    for (const row of data) {
      const values = headers.map((header) => {
        const escaped = ('' + row[header]).replace(/"/g, '\\"');
        return `"${escaped}"`;
      });
      csvRows.push(values.join(','));
    }

    // Create Download Link
    const blob = new Blob([csvRows.join('\n')], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `${filename}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <button
      onClick={exportToCSV}
      className="bg-[#0D0F11] border border-[#2D3139] hover:border-[#B8892B] text-[#C5C8D0] hover:text-[#B8892B] text-xs font-mono px-3 py-1.5 rounded-sm transition-all flex items-center gap-2"
    >
      <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20">
        <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
      </svg>
      <span>Export to CSV</span>
    </button>
  );
}