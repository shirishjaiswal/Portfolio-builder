import { nextui } from '@nextui-org/theme';
import type { Config } from "tailwindcss";

function generatePercentages(range: number): Record<string, string> {
  const percentages: Record<string, string> = {};
  for (let i = 1; i <= range; i++) {
    percentages[`${i}p`] = `${i}%`;
  }
  return percentages;
}

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/components/(button|calendar|checkbox|date-picker|dropdown|input|modal|radio|spinner|popover|ripple|date-input|menu|divider).js"
  ],
  theme: {
    extend: {
      fontFamily: {
        roboto: "var(--font-roboto)",
      },
      colors: {
        black: "#000000",
        white: "#FFFFFF",
        gray: {
          "900": "#D9D9D9",
          "800": "#D1D5DB",
          "700": "#9CA3AF",
          "600": "#6B7280",
          "500": "#4B5563",
          "400": "#374151",
          "300": "#1F2937",
          "200": "#E5E7EB",
          "100": "#F3F4F6",
          "50": "#F9FAFB",
        },
        skyBlue: {
          "800": "#0077B6",
        },
        success: {
          "700": "#027A48",
          "50": "#ECFDF3",
        },
        danger: {
          "600": "#D92D20",
          "400": "#F97066",
          "700": "#C4320A",
        },
      },
      top: generatePercentages(100),
      margin: generatePercentages(100),
      padding: generatePercentages(100),
      width: generatePercentages(100),
      minWidth: generatePercentages(100),
      maxWidth: generatePercentages(100),
      height: generatePercentages(100),
      minHeight: generatePercentages(100),
      maxHeight: generatePercentages(100),
    },
    screens: {
      'sm': '640px',   // Small screens (mobile)
      'md': '768px',   // Medium screens (tablets)
      'lg': '1024px',  // Large screens (desktops)
      'xl': '1280px',  // Extra large screens (large desktops)
      '2xl': '1536px', // Very large screens
    },
    keyframes: {
      fadeIn: {
        '0%': { opacity: '0' },
        '100%': { opacity: '1' },
      },
      typing: {
        '0%': { width: '0%' },
        '100%': { width: '100%' },
      },
      blink: {
        '50%': { borderColor: 'transparent' },
        '100%': { borderColor: 'currentColor' },
      },
    },
    animation: {
      fadeIn: 'fadeIn 1s ease-in-out',
      typing: 'typing 2s steps(30, end) forwards, blink 0.75s step-end infinite',
    },
  },
  plugins: [nextui()],
};

export default config;
