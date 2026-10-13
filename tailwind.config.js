/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './*/index.html', './*/*/index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Light/dark values live in src/index.css (:root and .dark).
        paper: 'rgb(var(--paper) / <alpha-value>)', // page background
        ink: 'rgb(var(--ink) / <alpha-value>)', // text
        tile: 'rgb(var(--tile) / <alpha-value>)', // product photo backgrounds
        accent: 'rgb(var(--accent) / <alpha-value>)', // the red from the thumbnails, used sparingly
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'sans-serif'],
      },
      maxWidth: {
        page: '72rem',
      },
    },
  },
  plugins: [],
}
