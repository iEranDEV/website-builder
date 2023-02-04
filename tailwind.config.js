/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./app/**/*.{js,ts,jsx,tsx}",
		"./pages/**/*.{js,ts,jsx,tsx}",
		"./components/**/*.{js,ts,jsx,tsx}",
		"./src/**/*.{js,ts,jsx,tsx}",
	  ],
	theme: {
		extend: {
			keyframes: {
				slideFromLeft: {
					'0%': { transform: 'translateX(-100px)' },
					'100%': { transform: 'translateX(0%)' }
				}
			},
			animation: {
				slide: 'slideFromLeft 0.2s linear'
			}
		},
	},
	plugins: [
		require('@tailwindcss/line-clamp'),
	],
}
