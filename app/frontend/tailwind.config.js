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
			regular: ['Regular'],
			dreamscape: ['Dreamscape'],
			'dreamscape-sans': ['Dreamscape-Sans'],
		},
		extend: {
			colors: {
				level: '#FFCE9E',
				light: '#B7AA9C',
				border: '#646464',
				online: '#46E9D2',
				defeat: '#F54E62',
				offline: '#686259',
				primary: '#FBFBEE',
				secondary: '#1B1611',
				achievement: '#FFCE9D',
				glow: "#ffffff",
				'secondary-light': '#564636',
				'backdrop-40': 'rgba(0, 0, 0, 0.4)',
				'backdrop-80': 'rgba(0, 0, 0, 0.8)',
			},
			keyframes: {
				glow: {
				"0%, 100%": { textShadow: "0 0 10px #ffffasff" },
				"50%": { textShadow: "0 0 20px #f39c12" },
				},
			},
			animation: {
				glow: "glow 1.5s infinite",
			},
			borderWidth: {
				0.7: '0.7px',
				1.5: '1.5px',
			},
			width: {
				'card-custom': 'clamp(26.875rem, 26.0227rem + 4.5455vw, 33.125rem)',
				'fl-ldr-custom': 'clamp(18rem, 15.283vw + 4.245rem, 28.125rem)',

				'user-div': 'clamp(4.125rem, 7.281vw + 2.76rem, 6.25rem)',

				'select-table': 'clamp(28.875rem, 22.462vw + 20.312rem, 56.25rem)',

				'game-table-mtb': 'clamp(26.25rem, 48.38vw + 13.218rem, 90.625rem)',

				'chart-lp': 'clamp(25rem, 19.531vw + 12.5rem, 43.75rem)',
				'chart-ms': 'clamp(18.625rem, 41.77vw + 10.793rem, 37.5rem)',

				'profile-cards': 'clamp(57.75rem, 50.521vw + 25.417rem, 106.25rem)',

				custom: 'clamp(37.5rem, 22.124vw + 33.352rem, 68.75rem)',
			},
			height: {
				// Custom clamp values
				'card': 'clamp(28.125rem, 23.585vw + 6.899rem, 43.75rem)',
				'chart-lp': 'clamp(8.75rem, 12.37vw + 0.833rem, 20.625rem)',
				'chart-ms': 'clamp(9.375rem, 20.747vw + 5.485rem, 18.75rem)',
				'profile-cards': 'clamp(31.625rem, 27.669vw + 13.917rem, 58.188rem)',
				'signin-card-custom': 'clamp(35rem, 7.727vw + 33.551rem, 45.625rem)',
				'signup-card-custom': 'clamp(36.875rem, 9.545vw + 35.085rem, 50rem)',
				'1vs1-lg': 'clamp(11.063rem, 10.66vw + 1.468rem, 18.125rem)',
				'training-lg': 'clamp(11.563rem, 10.849vw + 1.798rem, 18.75rem)',
				'tournaments-lg': 'clamp(24.063rem, 22.83vw + 3.515rem, 39.188rem)',

				'shapes-ms': 'clamp(8.625rem, 42.493vw + 0.657rem, 38.875rem)',
				'shapes-lg': 'clamp(24.063rem, 21.607vw + 4.616rem, 39.188rem)',

				chat: 'clamp(29.688rem, 20.133vw + 25.913rem, 58.125rem)',
				'chat-ms': 'clamp(37.5rem, 17.699vw + 34.181rem, 62.5rem)',
				'users-div': 'clamp(29.375rem, 12.835vw + 23.214rem, 43.75rem)',
				'leftside-chat-ms': 'clamp(10rem, 4.283vw + 9.197rem, 11.25rem)',
				'leftside-chat-tb': 'clamp(9.375rem, 21.413vw + 5.36rem, 15.625rem)',

				'user-tb': 'clamp(3.5rem, 2.232vw + 2.429rem, 6rem)',

				profile: 'clamp(31.64rem, 13.9246rem + 27.6803vw, 58.213125rem)',
			},
			padding: {
				// Chat User informations
				'section-lg': 'clamp(0.625rem, 2.727vw + 0.114rem, 4.375rem)',
				'cards-lg': 'clamp(0.5rem, 2.5vw - 1.75rem, 2.25rem)',
				'user-info-x-lg': 'clamp(1.563rem, 1.339vw + 0.357rem, 2.5rem)',
				'user-info-x-ms': 'clamp(0.313rem, 6.256vw - 0.861rem, 4.375rem)',
				'user-info-y-ms': 'clamp(0.938rem, 2.887vw + 0.396rem, 2.813rem)',
				'user-info-t': 'clamp(3.125rem, 2.679vw + 0.714rem, 5rem)',
				
				// Chat Users
				'user-div-px-tb': 'clamp(0.625rem, 1.116vw + 0.089rem, 1.875rem)',
			},
			margin: {
				// Game modes
				'modes-left-lg': 'clamp(0rem, 7.143vw - 8.929rem, 2.5rem)',
				'modes-right-lg': 'clamp(0.313rem, 6.132vw - 5.206rem, 4.375rem)',
				'modes-left-ms': 'clamp(0.625rem, 3.304vw - 0.265rem, 2.5rem)',
				'modes-right-ms': 'clamp(0.625rem, 3.304vw - 0.265rem, 2.5rem)',

				// Profile Page
				'container-x-lp': 'clamp(3.125rem, 33.929vw - 27.411rem, 26.875rem)',
				'container-x-ms': 'clamp(0.313rem, 4.841vw - 0.595rem, 2.5rem)',
				'about-lp': 'clamp(0.5rem, 0.872vw + 0.168rem, 1.563rem)',
			},
		},
	},
	plugins: [],
}
