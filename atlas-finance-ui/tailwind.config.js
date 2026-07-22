/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Terminal Base Palette
        terminal: {
          bg: '#0D0F11',       // Primary background
          panel: '#14171B',    // Card/Container background
          border: '#2D3139',   // Subdued border
          hover: '#1A1E24',    // Hover states
          input: '#181C21',    // Form inputs
        },
        // Institutional Financial Accents
        gain: {
          DEFAULT: '#1B5E4A',  // Bullish green background
          text: '#7FBF9E',     // Bullish text
        },
        loss: {
          DEFAULT: '#8B2626',  // Bearish red background
          text: '#D98E85',     // Bearish text
        },
        accent: {
          gold: '#B8892B',     // Highlight/Primary metric gold
          goldHover: '#D49E35',
        },
        text: {
          primary: '#F7F6F2',   // Off-white high contrast
          secondary: '#C5C8D0', // Subdued text
          muted: '#8C9097',     // Dim/Label text
        },
      },
      fontFamily: {
        mono: ['var(--font-geist-mono)', 'Consolas', 'Monaco', 'monospace'],
        serif: ['Georgia', 'Cambria', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'pulse-fast': 'pulse 1.2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
};
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        marquee: 'marquee 30s linear infinite',
      },
    },
  },
};