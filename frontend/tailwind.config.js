/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Enable dark mode
  theme: { extend: { backgroundColor: { dark: { primary: '#1a202c', secondary: '#2d3748', } }, textColor: { dark: { primary: '#f7fafc', secondary: '#e2e8f0', } } },
  },
  plugins: [],
}

