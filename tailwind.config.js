/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './client/**/*.{html,js,jsx,ts,tsx}', // Inclui todos os arquivos na pasta client
    './*.html',                           // Inclui o arquivo HTML principal
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
