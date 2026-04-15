/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        warm: '0 25px 60px -20px rgba(41, 24, 17, 0.55)',
      },
      colors: {
        brand: {
          50: '#f7f1eb',
          100: '#eadccf',
          200: '#dbc3ab',
          300: '#caa27f',
          400: '#b8845b',
          500: '#9b6643',
          600: '#7c4f35',
          700: '#5e3b29',
          800: '#40271d',
          900: '#281811',
          950: '#180e09',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

