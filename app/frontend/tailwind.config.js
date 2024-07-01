/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        screens: {
            'sm': '300px',
            // => @media (min-width: 800px) { ... }
            'md': '1024px',
            // => @media (min-width: 1024px) { ... }
            'lg': '1440px',
            // => @media (min-width: 1440px) { ... }
            'xl': '1900px',
            // => @media (min-width: 2000px) { ... }
            '2xl': '2500px',
            // => @media (min-width: 2500px) { ... }
          },
        fontFamily: {
            'heavy': ['Heavy'],
            'medium': ['Medium'],
            'dreamscape': ['Dreamscape'],
        },
        extend: {
            colors: {
                primary: '#FBFBEE',
                secondary: '#1B1611',
            },
        },
    },
    plugins: [],
}
