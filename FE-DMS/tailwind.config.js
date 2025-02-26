import flowbite from "flowbite-react/tailwind";
/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite/**/*.js",
    flowbite.content(),
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        primary: ["Poppins", "arial", "sans-serif"],
      },
      backgroundImage: {
        login: "url('/images/bg-login.jpg')",
      },
    },
  },
  plugins: [flowbite.plugin()],
};
