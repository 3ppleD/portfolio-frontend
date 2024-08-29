/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", "./src/**/*.vue"],
  theme: {
    extend: {
      colors: {
        primary: "#0A192F",
        secondary: "#F97316",
        tertiary: "#54D6BB",
      },
    },
    screens: {
      lg: { max: "1023px" },
      

      md: { max: "767px" },
     
      sm: { max: "639px" },
     
    },
    plugins: [],
  },
};
