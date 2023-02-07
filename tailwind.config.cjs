/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/**/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      typography:{
        DEFAULT: {
          css: {
            maxWidth: 'none'
          }
        }
      },

      height: {
        '1/3-vh': '33vh',
        '1/2-vh': '50vh',
        '2/3-vh': '60vh',
        '3/4-vh': '75vh',
      },
      boxShadow:{
        'page': 'box-shadow: -10vw 0px 100vh black'
      },
      keyframes: {
        slidein: {
          '0%': { transform: 'transform: translateX(100%);' },
          '100%': { transform: 'translateX(0);' },
        },
        slideout: {
          '0%': { transform: 'transform: translateX(0);' },
          '100%': { transform: 'translateX(100%);' },
        }
      },
      animation: {
        slidein: 'slidein .5s ease-in-out forwards;',
        slideout: 'slideout .5s ease-in-out reverse forwards;',
      }
    },
  },
  plugins: [
      require("daisyui"),
      require('@tailwindcss/typography')
  ],
  daisyui: {
    themes: ["autumn"],
  },
}
