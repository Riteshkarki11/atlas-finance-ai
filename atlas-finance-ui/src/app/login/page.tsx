'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#0D0F11] text-[#F7F6F2] flex flex-col justify-center items-center p-6 relative font-sans">
      {/* Subtle Grid Background */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#2D3139 1px, transparent 1px)`,
          backgroundSize: '24px 24px',
        }}
      />

      <div className="w-full max-w-md relative z-10">
        {/* Terminal Logo Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 mb-2">
            <div className="w-8 h-8 border-2 border-[#F7F6F2] flex items-end p-1 gap-1">
              <span className="w-1.5 h-2 bg-[#1B5E4A]"></span>
              <span className="w-1.5 h-4 bg-[#7FBF9E]"></span>
              <span className="w-1.5 h-6 bg-[#B8892B]"></span>
            </div>
            <span className="serif text-3xl font-semibold tracking-tight text-[#F7F6F2]">
              Atlas<span className="text-[#B8892B] font-light ml-1">Finance AI</span>
            </span>
          </div>
          <p className="text-xs mono text-[#8C9097] uppercase tracking-widest">
            Institutional Financial Intelligence Terminal
          </p>
        </div>

        {/* Login Form Container */}
        <div className="bg-[#14171B] border border-[#2D3139] p-8 shadow-2xl rounded-sm">
          <form onSubmit={handleSubmit} className="space-y-5 text-xs mono">
            <div>
              <label className="block text-[#8C9097] uppercase mb-1 font-semibold">
                Institutional Email / ID
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="analyst@firm.com"
                className="w-full p-3 bg-[#0D0F11] border border-[#2D3139] text-white focus:outline-none focus:border-[#1B5E4A]"
              />
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <label className="block text-[#8C9097] uppercase font-semibold">Password</label>
                <a href="#" className="text-[#B8892B] hover:underline text-[10px]">Reset Key?</a>
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full p-3 bg-[#0D0F11] border border-[#2D3139] text-white focus:outline-none focus:border-[#1B5E4A]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#1B5E4A] hover:bg-[#144738] text-white font-bold uppercase tracking-wider transition-colors cursor-pointer"
            >
              Sign In to Terminal
            </button>
          </form>

          <div className="my-6 border-t border-[#2D3139] relative text-center">
            <span className="bg-[#14171B] px-3 text-[10px] mono text-[#8C9097] absolute -top-2.5 left-1/2 -translate-x-1/2">
              OR SINGLE SIGN-ON
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs mono">
            <button
              onClick={() => router.push('/dashboard')}
              className="py-2.5 bg-[#212529] hover:bg-[#2D3139] border border-[#2D3139] text-[#C5C8D0] font-medium transition-colors"
            >
              Google SSO
            </button>
            <button
              onClick={() => router.push('/dashboard')}
              className="py-2.5 bg-[#212529] hover:bg-[#2D3139] border border-[#2D3139] text-[#C5C8D0] font-medium transition-colors"
            >
              GitHub Enterprise
            </button>
          </div>
        </div>

        {/* Security Compliance Note */}
        <div className="mt-6 text-center text-[10px] mono text-[#5A5F68]">
          SEC 17a-4 Compliant · 256-Bit Financial Grade Encryption · Atlas AI v3.4
        </div>
      </div>
    </div>
  );
}