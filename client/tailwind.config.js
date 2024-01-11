/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    fontFamily: {
      BMDOHYUN: ["BMDOHYEON"]
    },
    extend: {
      backgroundImage: {
        'main-landing': "url(./asset/mainLandingBackground.jpg)"
      },
      boxShadow: {
        'clay': 'inset -16px -16px 16px 0 rgb(0 0 0 / 0.16)',
      }
    },
  },
  plugins: [],
}

