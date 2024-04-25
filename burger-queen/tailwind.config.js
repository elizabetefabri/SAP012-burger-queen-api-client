/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    fontFamily: {
      "Lato": ['Lato', 'sans-serif']
    },
    extend: {
      colors: {
        "color-header": "#18181B",
        "color-background": "#191919 ",
        "color-background-logado": "#1e1e1e",
        "color-border-gray": "#333333",
        "color-btn": "#373737",
        "color-font-gray": "#575151",
        "color-gray-icon": "#919191",
        "color-main": "#262626",
        "color-font-white": "#F9FAFB",
        "color-font-orange": "#C2410C",
        "color-font-green": "#459975",
      },
      maxWidth: {
        '1440': '1440px',
      },
    },
  },
  plugins: [],
}
