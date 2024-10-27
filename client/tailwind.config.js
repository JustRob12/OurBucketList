// tailwind.config.cjs
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        nudeBrown: '#D2B48C',    // Soft brown (tan)
        lightPink: '#FADADD',    // Light pastel pink
        creamWhite: '#FFF5E1',   // Creamy white for background
        blush: '#F5C1C1',        // Soft blush pink
        beige: '#E5D1BF',        // Neutral beige
      },
    },
  },
  plugins: [],
};
