/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/**/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            maxWidth: "none",
          },
        },
      },
      gridTemplateRows: {
        "0fr": "0fr",
        "1fr": "1fr",
      },

      height: {
        "1/3-vh": "33vh",
        "1/2-vh": "50vh",
        "2/3-vh": "60vh",
        "3/4-vh": "75vh",
      },
      boxShadow: {
        page: "box-shadow: -10vw 0px 100vh black",
      },
    },
  },
  plugins: [require("daisyui"), require("@tailwindcss/typography")],
  daisyui: {
    themes: ["autumn"],
  },
};
