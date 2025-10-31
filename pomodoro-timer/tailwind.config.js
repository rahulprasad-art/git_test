/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'work': '#dc2626',
        'short-break': '#16a34a',
        'long-break': '#2563eb',
      },
    },
  },
  plugins: [],
}
