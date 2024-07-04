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
				primary: '#FBFBEE',
				secondary: '#1B1611',
				backdrop40: 'rgba(0, 0, 0, 0.4)'
			},
			borderWidth: {
				1.5: '1.5px',
			},
			width: {
				// 'card-custom': 'clamp(21.875rem, 20.3409rem + 8.1818vw, 33.125rem)',
				'card-custom': 'clamp(26.875rem, 26.0227rem + 4.5455vw, 33.125rem)',
			},
			height: {
				'card-custom': 'clamp(37.5rem, 36.2216rem + 6.8182vw, 46.875rem)',
			},
		},
	},
	plugins: [],
}
