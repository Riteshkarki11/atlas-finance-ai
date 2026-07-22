'use client';

import { useEffect } from 'react';

interface HotkeyConfig {
  onTabChange: (tab: string) => void;
  onFocusSearch: () => void;
}

export function useTerminalHotkeys({ onTabChange, onFocusSearch }: HotkeyConfig) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Ignore keybindings if the user is typing in an input or textarea
      if (
        ['INPUT', 'TEXTAREA'].includes((event.target as HTMLElement)?.tagName) &&
        event.key !== 'Escape'
      ) {
        return;
      }

      // Quick Search Focus: Press '/'
      if (event.key === '/') {
        event.preventDefault();
        onFocusSearch();
      }

      // Alt + Number Keys for Instant Tab Navigation
      if (event.altKey) {
        switch (event.key) {
          case '1':
            event.preventDefault();
            onTabChange('overview');
            break;
          case '2':
            event.preventDefault();
            onTabChange('financials');
            break;
          case '3':
            event.preventDefault();
            onTabChange('ratios');
            break;
          case '4':
            event.preventDefault();
            onTabChange('dcf');
            break;
          case '5':
            event.preventDefault();
            onTabChange('fno');
            break;
          case '6':
            event.preventDefault();
            onTabChange('ai_research');
            break;
          case '7':
            event.preventDefault();
            onTabChange('ipo_actions');
            break;
          default:
            break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onTabChange, onFocusSearch]);
}