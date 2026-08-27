/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        janbhasha: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
          950: '#052e16',
        },
        cream: {
          50: '#fcfdfa',
          100: '#f7f9f2',
          200: '#edf2e4',
          300: '#dde6ce',
          400: '#c5d5b0',
        },
        earth: {
          50: '#faf6f0',
          100: '#f3ece0',
          200: '#e5d7be',
          300: '#d4bc97',
          400: '#c19e71',
          500: '#a8824f',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 2px 12px -2px rgba(0, 0, 0, 0.05), 0 1px 4px -1px rgba(0, 0, 0, 0.03)',
        'elevated': '0 10px 25px -5px rgba(22, 101, 52, 0.12), 0 8px 10px -6px rgba(0, 0, 0, 0.04)',
        'fab': '0 8px 24px -4px rgba(22, 128, 61, 0.45)',
      }
    },
  },
  plugins: [],
}
