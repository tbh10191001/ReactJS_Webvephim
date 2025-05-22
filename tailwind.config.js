/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{html,js,jsx}', './components/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            gridTemplateColumns: {
                // Simple 16 column grid
                2: '200px 1fr',

                // Complex site-specific column configuration
                footer: '200px minmax(900px, 1fr) 100px',
            },
            keyframes: {
                sildeInRight: {
                    '0%': {
                        transform: 'translateX(1000px)',
                        opacity: '0',
                    },
                    '100%': {
                        transform: 'translateX(0)',
                        opacity: '1',
                    },
                },
                hide: {
                    '0%': {
                        transform: 'translateX(0)',
                        opacity: '0',
                    },
                    '100%': {
                        transform: 'translateX(1000px)',
                        opacity: '1',
                    },
                },
            },
            spacing: {
                420: '40rem',
            },
            // keyframes: {
            //     wiggle: {
            //         '0%, 100%': { transform: 'rotate(-3deg)' },
            //         '50%': { transform: 'rotate(3deg)' },
            //     },
            // },
            animation: {
                sildeInRight: 'sildeInRight 1s ease-in-out',
                hide: 'hide 1s ease-in-out',
            },
            // animation: {
            //     wiggle: 'wiggle 1s ease-in-out infinite',
            // },
            scale: {
                101: '1.02',
            },
        },
        fontFamily: {
            main: ['Montserrat'],
        },
        colors: {
            transparent: 'transparent',
            mainColor: '#b91c1c',
            pinkColor: '#f7c6c6',
            textColor: '#a3a3a3',
            black: '#000000',
            white: '#ffffff',
            bgmain: '#1B1D24',
            bgsecondary: '#222532',
            bgthird: '#42414F',
            sliderButton: '#f9fafb',
            sliderButtonHover: '#d1d5db',
            btGreen: '#15803d',
            bgModal: '#00000080',
            bgPink: '#be185d',
            yellow: '#eab308',
            lime: '#84cc16',
            stone: '#d6d3d1',
            cyan300: '#67e8f9',
        },
        boxShadow: {
            '3xl': '0 25px 50px -12px rgba(0, 0, 0, 1)',
        },
    },
    fontSize: {
        '9xl': [
            '12rem',
            {
                lineHeight: '2.25rem',
                letterSpacing: '-0.02em',
                fontWeight: '700',
            },
        ],
    },
    minHeight: {
        '3/4': '75%',
    },
    plugins: [],
};
