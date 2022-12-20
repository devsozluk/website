/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: "Poppins",
      },
      colors: {
        background: "#0f172a",
        placeholder: "#6F7181",
        primary: "#4fc6ff",
        secondary: "#f3f4f1",
        tertiary: "#909090",
        buttonPrimary: "#068cfc",
      },
    },
  },
  plugins: [],
};
