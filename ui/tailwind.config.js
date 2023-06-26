/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,jsx,tsx,ts}'],
  theme: {
    extend: {
      backgroundImage: {
        'search-bar-content':
          "url('./src/components/homepageComponents/backgroundimage.png')",
      },
    },

    fontFamily: {
      dancing: 'Dancing Script, cursive',
    },

    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
    },
  },
  plugins: [],
  
}
