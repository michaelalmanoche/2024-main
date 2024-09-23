import type { Config } from "tailwindcss";

const config: Config = {

  

  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      // => @media (min-width: 640px) { ... }
      sm: '640px',
      // => @media (min-width: 768px) { ... }
      md: '768px',
      // => @media (min-width: 1024px) { ... }
      lg: '1024px',
      // => @media (min-width: 1280px) { ... }
      xl: '1280px',
      // => @media (min-width: 1536px) { ... }
      '2xl': '1536px',
    },
    extend: {
      colors: {
        'custom-blue': '#4F46E5',
        'custom-gray': '#F9FAFB',
        'tbh': '#F9FAFB',
        'text-th':'#37475C',
        'custom-gray-2': '#FDFDFD',
        'custom-black': '#2A2B2D',
        'custom-white': '#EDF1F9',
        customBg: '#F8F8F8',
        variants: {
          extend: {
            textColor: {
              'hover': 'hover',
              'focus': 'focus',
              'active': 'active',
            },
            stroke: {
              hover: 'hover',
              focus: 'focus',
              active: 'active',
            },
          },
        },
        gray: {
          950: '#1a1a1a', // You can adjust this value to the actual color you want for gray-950
        },
        primary: {
          
          "50": "#eff6ff",
          "100": "#dbeafe",
          "200": "#bfdbfe",
          "300": "#93c5fd",
          "400": "#60a5fa",
          "500": "#3b82f6",
          "600": "#2563eb",
          "700": "#1d4ed8",
          "800": "#1e40af",
          "900": "#1e3a8a",
          "950": "#172554",
        },
      },
      fontFamily: {
        body: [
          'Inter', 
          'ui-sans-serif', 
          'system-ui', 
          '-apple-system', 
          'system-ui', 
          'Segoe UI', 
          'Roboto', 
          'Helvetica Neue', 
          'Arial', 
          'Noto Sans', 
          'sans-serif', 
          'Apple Color Emoji', 
          'Segoe UI Emoji', 
          'Segoe UI Symbol', 
          'Noto Color Emoji',
        ],
        sans: [
          'Inter', 
          'ui-sans-serif', 
          'system-ui', 
          '-apple-system', 
          'system-ui', 
          'Segoe UI', 
          'Roboto', 
          'Helvetica Neue', 
          'Arial', 
          'Noto Sans', 
          'sans-serif', 
          'Apple Color Emoji', 
          'Segoe UI Emoji', 
          'Segoe UI Symbol', 
          'Noto Color Emoji',
        ],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};

export default config;
