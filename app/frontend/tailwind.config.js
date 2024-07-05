/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		screens: {
			sm: '300px',
			av: '431px',
			md: '1024px',
			lg: '1440px',
			xl: '1900px',
			'2xl': '2500px',
		},
		fontFamily: {
			heavy: ['Heavy'],
			medium: ['Medium'],
			dreamscape: ['Dreamscape'],
		},
		extend: {
			colors: {
				light: '#B7AA9C',
				border: '#646464',
				primary: '#FBFBEE',
				secondary: '#1B1611',
				'secondary-light': '#564636',
				'backdrop-40': 'rgba(0, 0, 0, 0.4)',
			},
			borderWidth: {
				1.5: '1.5px',
			},
			width: {
				'card-custom': 'clamp(26.875rem, 26.0227rem + 4.5455vw, 33.125rem)',
			},
			height: {
				'signin-card-custom': 'clamp(35rem, 7.727vw + 33.551rem, 45.625rem)',
				'signup-card-custom': 'clamp(36.875rem, 9.545vw + 35.085rem, 50rem)',
			},
		},
	},
	plugins: [],
}
