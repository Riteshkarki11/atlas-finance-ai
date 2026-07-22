'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavItem {
  name: string;
  href: string;
  icon: string;
  badge?: string;
}

interface NavGroup {
  category: string;
  items: NavItem[];
}

const NAVIGATION: NavGroup[] = [
  {
    category: 'CORE WORKSPACE',
    items: [
      { name: 'Mission Control', href: '/dashboard', icon: '📊' },
      { name: 'Company Workspace', href: '/company/NVDA', icon: '🏢' },
      { name: 'Portfolio Analytics', href: '/portfolio', icon: '💼' },
      { name: 'Peer Comparison', href: '/compare', icon: '⚖️' },
      { name: 'Stock Screener', href: '/screener', icon: '🔍' },
    ],
  },
  {
    category: 'VALUATION DESK (IB)',
    items: [
      { name: 'DCF Model Engine', href: '/models/dcf', icon: '📐' },
      { name: 'LBO Modeling Desk', href: '/lbo', icon: '🏦', badge: 'PRO' },
      { name: 'M&A Accretion/Dilution', href: '/models/ma', icon: '🤝', badge: 'PRO' },
      { name: 'SEC Audit Trail', href: '/audit-trail', icon: '🛡️' },
    ],
  },
  {
    category: 'RESEARCH & REPORTING',
    items: [
      { name: 'AI Research Desk', href: '/research', icon: '🧠', badge: 'AI' },
      { name: 'Report Generator', href: '/reports', icon: '📄' },
      { name: 'Settings & Risk', href: '/settings', icon: '⚙️' },
    ],
  },
];

export default function TerminalSidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`${
        collapsed ? 'w-16' : 'w-64'
      } bg-[#14171B] text-[#F7F6F2] border-r border-[#2D3139] flex flex-col justify-between transition-all duration-300 min-h-screen sticky top-0 z-50 select-none font-mono`}
    >
      {/* Brand Header */}
      <div>
        <div className="p-4 border-b border-[#2D3139] flex items-center justify-between">
          {!collapsed && (
            <div className="flex items-center gap-2.5">
              <div className="w-5 h-5 border-[1.5px] border-[#F7F6F2] flex items-end p-0.5 gap-0.5">
                <span className="w-1 h-1 bg-[#1B5E4A]"></span>
                <span className="w-1 h-2 bg-[#7FBF9E]"></span>
                <span className="w-1 h-3.5 bg-[#B8892B]"></span>
              </div>
              <span className="serif font-semibold text-lg tracking-tight text-[#F7F6F2]">
                Atlas<span className="text-[#B8892B] font-light ml-1">Terminal</span>
              </span>
            </div>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="text-[#8C9097] hover:text-white p-1 text-xs rounded bg-[#212529] transition-colors"
            title={collapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
          >
            {collapsed ? '→' : '←'}
          </button>
        </div>

        {/* Navigation Section */}
        <nav className="p-2 space-y-5">
          {NAVIGATION.map((group) => (
            <div key={group.category}>
              {!collapsed && (
                <div className="px-3 mb-2 text-[10px] tracking-widest text-[#787D87] uppercase font-bold">
                  {group.category}
                </div>
              )}
              <div className="space-y-0.5">
                {group.items.map((item) => {
                  const isActive =
                    pathname === item.href ||
                    (item.href !== '/' && pathname.startsWith(item.href + '/'));

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center justify-between px-3 py-2 rounded text-xs font-medium transition-all ${
                        isActive
                          ? 'bg-[#1B5E4A] text-white font-semibold shadow-sm'
                          : 'text-[#C5C8D0] hover:bg-[#212529] hover:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span className="text-sm shrink-0">{item.icon}</span>
                        {!collapsed && (
                          <span className="truncate">{item.name}</span>
                        )}
                      </div>
                      {!collapsed && item.badge && (
                        <span
                          className={`text-[9px] px-1.5 py-0.5 rounded font-bold shrink-0 ${
                            item.badge === 'AI'
                              ? 'bg-[#B8892B] text-black'
                              : 'bg-[#2A3038] text-[#8C9097]'
                          }`}
                        >
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>
      </div>

      {/* Terminal Footer Status */}
      <div className="p-3 border-t border-[#2D3139] bg-[#0D0F11] text-[10px] text-[#787D87]">
        {!collapsed ? (
          <div className="flex justify-between items-center">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1B5E4A] animate-pulse"></span>
              SYS: ONLINE
            </span>
            <span>v3.4.2</span>
          </div>
        ) : (
          <div className="text-center" title="System Online">
            🟢
          </div>
        )}
      </div>
    </aside>
  );
}