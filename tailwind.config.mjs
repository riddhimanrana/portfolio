/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme'

export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		darkMode: "class",
		extend: {
			scale: {
				'102': '1.02',
			},
			fontFamily: {
				'mono': ['JetBrains Mono', 'monospace'],
				sans: ['Inter', ...defaultTheme.fontFamily.sans],
			},
			keyframes: {
				fadeIn: {
				'0%' : { opacity: '0', transform: 'translateY(40px)' },
				'100%' : { opacity: '1', transform: 'translateY(0)' },
			},
			profileAnimation: {
				'0%' : { width: '130px', height: '130px'},
				'100%' : { width: '150px', height: '150px' },
			},
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
		require('@tailwindcss/typography'),
		require("@catppuccin/tailwindcss")({
		  defaultFlavor: "macchiato",
		}),
	  ],
}
