/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		screens: {
			ms: '300px',
			ml: '431px',
			mtb: '610px',
			tb: '768px',
			lp: '1024px',
			lg: '1440px',
			xl: '1900px',
			'4k': '2500px',
		},
		fontFamily: {
			heavy: ['Heavy'],
			medium: ['Medium'],
			dreamscape: ['Dreamscape'],
			'dreamscape-sans': ['Dreamscape-Sans'],
		},
		extend: {
			colors: {
				online: '#46E9D2',
				ingame: '#F54E62',
				offline: '#686259',
				light: '#B7AA9C',
				border: '#646464',
				primary: '#FBFBEE',
				secondary: '#1B1611',
				achievement: '#FFCE9D',
				'secondary-light': '#564636',
				'backdrop-40': 'rgba(0, 0, 0, 0.4)',
			},
			borderWidth: {
				0.7: '0.7px',
				1.5: '1.5px',
			},
			width: {
				'card-custom': 'clamp(26.875rem, 26.0227rem + 4.5455vw, 33.125rem)',
				'fl-ldr-custom': 'clamp(18rem, 15.283vw + 4.245rem, 28.125rem)',
				'fl-ldr-custom': 'clamp(18rem, 15.283vw + 4.245rem, 28.125rem)',
			},
			height: {
				'signin-card-custom': 'clamp(35rem, 7.727vw + 33.551rem, 45.625rem)',
				'signup-card-custom': 'clamp(36.875rem, 9.545vw + 35.085rem, 50rem)',
				'fl-ldr-custom': 'clamp(28.125rem, 23.585vw + 6.899rem, 43.75rem)',
			},
			padding: {
				'cards-section-pl': 'clamp(0.5rem, 5.849vw - 4.764rem, 4.375rem)',
				'cards-section-pr': 'clamp(0.5rem, 2.642vw - 1.877rem, 2.25rem)',
			}
		},
	},
	plugins: [],
}
