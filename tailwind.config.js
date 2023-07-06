/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{html,js,jsx}', './components/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {},
        fontFamily: {
            main: ['Montserrat'],
        },
        colors: {
            transparent: 'transparent',
            mainColor: '#b91c1c',
            textColor: '#a3a3a3',
            black: '#000000',
            white: '#ffffff',
            bgmain: '#1B1D24',
            bgsecondary: '#222532',
            bgthird: '#42414F',
            sliderButton: '#f9fafb',
            sliderButtonHover: '#d1d5db',
        },
    },
    plugins: [],
};
