/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './*/index.html', './*/*/index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        paper: '#F6F5F1', // page background
        ink: '#17160F', // text
        accent: '#D7381E', // the red from the thumbnails, used sparingly
      },
      fontFamily: {
        display: ['"Instrument Serif"', 'Georgia', 'serif'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'sans-serif'],
      },
      maxWidth: {
        page: '72rem',
      },
    },
  },
  plugins: [],
}
