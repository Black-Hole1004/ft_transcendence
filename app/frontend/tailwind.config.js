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
				level: '#FFCE9E',
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
				'fl-ldr-custom': 'clamp(28.125rem, 23.585vw + 6.899rem, 43.75rem)',
				'signin-card-custom': 'clamp(35rem, 7.727vw + 33.551rem, 45.625rem)',
				'signup-card-custom': 'clamp(36.875rem, 9.545vw + 35.085rem, 50rem)',
				'1vs1-lg': 'clamp(11.063rem, 10.66vw + 1.468rem, 18.125rem)',
				'training-lg': 'clamp(11.563rem, 10.849vw + 1.798rem, 18.75rem)',
				'tournaments-lg': 'clamp(24.063rem, 22.83vw + 3.515rem, 39.188rem)',
				'shapes-ms': 'clamp(8.625rem, 42.493vw + 0.657rem, 38.875rem)',
				'shapes-lg': 'clamp(24.063rem, 21.607vw + 4.616rem, 39.188rem)',
				'achievements-lg': 'clamp(15.625rem, 10.714vw + 5.982rem, 23.125rem)',
			},
			padding: {
				'cards-section-pl': 'clamp(0.5rem, 5.849vw - 4.764rem, 4.375rem)',
				'cards-section-pr': 'clamp(0.5rem, 2.642vw - 1.877rem, 2.25rem)',
			},
			margin: {
				'modes-left-lg': 'clamp(0rem, 7.143vw - 8.929rem, 2.5rem)',
				'modes-right-lg': 'clamp(0.313rem, 6.132vw - 5.206rem, 4.375rem)',
				'modes-left-ms': 'clamp(0.625rem, 3.304vw - 0.265rem, 2.5rem)',
				'modes-right-ms': 'clamp(0.625rem, 3.304vw - 0.265rem, 2.5rem)',
			}
		},
	},
	plugins: [],
}
