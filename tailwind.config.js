/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Classic Echo color palette
        gold: {
          50: '#fefdf7',
          100: '#fef9e7',
          200: '#fdf3d1',
          300: '#fbe9a8',
          400: '#f7d974',
          500: '#FFD700',
          600: '#e4b025',
          700: '#bd8c1d',
          800: '#976e1c',
          900: '#7c5a1a',
          950: '#B8860B', // Classic gold
        },
        white: {
          50: '#ffffff',
          100: '#fefefe',
          200: '#fdfdfd',
          300: '#fcfcfc',
          400: '#fbfbfb',
          500: '#ffffff',
          600: '#f5f5f5',
          700: '#e5e5e5',
          800: '#d4d4d4',
          900: '#a3a3a3',
          950: '#737373', // Pure white
        },
        black: {
          50: '#f6f6f6',
          100: '#e7e7e7',
          200: '#d1d1d1',
          300: '#b0b0b0',
          400: '#888888',
          500: '#6d6d6d',
          600: '#5d5d5d',
          700: '#4f4f4f',
          800: '#454545',
          900: '#3d3d3d',
          950: '#000000', // Pure black
        },
        chocolate: {
          50: '#fef7f2',
          100: '#fdecd8',
          200: '#fbd5b0',
          300: '#f8b87d',
          400: '#f5944a',
          500: '#8B4513',
          600: '#7c3e10',
          700: '#6b350d',
          800: '#5a2c0a',
          900: '#492308',
          950: '#3E2723', // Rich chocolate
        },
        // Book colors for aged vintage look
        bookGreen: '#2C5530', // Deep forest green
        bookTan: '#B5A492', // Weathered tan/beige
        bookTerracotta: '#C17A5E', // Dusty terracotta
        bookBurgundy: '#8B1A1A', // Aged burgundy/maroon
        bookNavy: '#3B5998', // Faded navy blue
        woodBase: '#A0522D' // Wooden shelf base
      },
      fontFamily: {
        'heading': ['Noto Serif Georgian', 'serif'],
        'body': ['BPG Arial', 'Arial', 'sans-serif'],
        'georgian': ['Noto Serif Georgian', 'serif'],
        'arial': ['BPG Arial', 'Arial', 'sans-serif'],
        'noto-serif': ['Noto Serif Georgian', 'serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      boxShadow: {
        'golden': '0 10px 25px -5px rgba(212, 175, 55, 0.2), 0 4px 6px -1px rgba(212, 175, 55, 0.1)',
        'golden-lg': '0 20px 25px -5px rgba(212, 175, 55, 0.2), 0 10px 10px -5px rgba(212, 175, 55, 0.1)',
        'golden-glow': '0 0 20px rgba(212, 175, 55, 0.3)',
        'dark': '0 10px 25px -5px rgba(0, 0, 0, 0.3), 0 4px 6px -1px rgba(0, 0, 0, 0.2)',
      }
    },
  },
  plugins: [],
} 