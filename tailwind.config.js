/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bone: '#EAE5DC', // warm cream, slightly aged
        porcelain: '#FAFAFA', // cold clean white
        chrome: '#C8CDD2', // brushed steel grey
        graphite: '#3A3A3A', // carbon composite
        charcoal: '#1A1A1A', // deep engineered black
        void: '#0A0A0A', // true black
        cyan: '#00E5FF', // emissive electric cyan
      },
      fontFamily: {
        display: ['Anton', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
