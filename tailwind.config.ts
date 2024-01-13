import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        fadeIn: {
          '0%' : { opacity: '0', transform: 'translateY(40px)' },
           '100%' : { opacity: '1', transform: 'translateY(0)' },
       },
       profileAnimation: {
        '0%' : { width: '130px', height: '130px'},
         '100%' : { width: '150px', height: '150px' },
      }
    },
      boxShadow: {
        '3xl': '0 0 20px',
      },
      animation: {
        fadeIn: 'fadeIn 1s ease-in-out forwards',
        profileAnimation: 'profileAnimation 1s ease-in-out forwards',
      }
    },
  },
  plugins: [
    require("@catppuccin/tailwindcss")({
      defaultFlavor: "macchiato",
    }),
  ],
};
export default config;