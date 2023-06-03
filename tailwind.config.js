/** @type {import("tailwindcss").Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        dark: {
          100: "#19171d",
          200: "#1d1c1d",
          250: "#1A1D21",
          300: "#27242e",
        },
        primary: {
          100: "#4a154b",
          200: "#f4ede4",
          white: "#fff",
        },
        accent: {
          100: "#36c5f0",
          200: "#2eb67d",
          300: "#ecb22e",
          400: "#e01e5a",
        },
      },
    },
  },
  plugins: [],
};
