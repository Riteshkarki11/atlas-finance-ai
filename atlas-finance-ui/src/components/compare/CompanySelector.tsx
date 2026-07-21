"use client";

import { useState } from "react";

interface Props {

  value: string;

  onChange: (symbol: string) => void;

  placeholder?: string;

}

export default function CompanySelector({

  value,

  onChange,

  placeholder = "Ticker",

}: Props) {

  const [symbol, setSymbol] = useState(value);

  function handleSubmit() {

    const ticker = symbol.trim().toUpperCase();

    if (!ticker) return;

    onChange(ticker);

  }

  return (

    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">

      <label className="mb-3 block text-sm font-medium text-slate-400">
        Company
      </label>

      <div className="flex gap-3">

        <input
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSubmit();
            }
          }}
          placeholder={placeholder}
          className="flex-1 rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-blue-500"
        />

        <button
          onClick={handleSubmit}
          className="rounded-lg bg-blue-600 px-5 py-3 font-medium text-white transition hover:bg-blue-500"
        >
          Compare
        </button>

      </div>

    </div>

  );

}