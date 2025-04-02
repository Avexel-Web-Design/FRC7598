/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      colors: {
        'dark': '#000000', // Dark color (black)
        'primary': {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8', // This matches the --primary-color in CSS variables
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
          950: '#082f49',
        },
        'secondary': {
          50: '#f5f3ff',
          100: '#ede9fe',
          200: '#ddd6fe',
          300: '#c4b5fd',
          400: '#8b5cf6', // This matches the --secondary-color in CSS variables
          500: '#7c3aed',
          600: '#6d28d9',
          700: '#5b21b6',
          800: '#4c1d95',
          900: '#4a1d96',
          950: '#2e1065',
        },
        'sca-purple': '#471a67',
        'sca-gold': '#d3b840',
        'sca-purple-light': '#652b90',
        'sca-purple-dark': '#35134d',
        'sca-gold-light': '#e4ce67',
        'sca-gold-dark': '#aa9433',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      animation: {
        'spin-slow': 'spin 12s linear infinite',
        'spin-slow-reverse': 'spin 15s linear infinite reverse',
        'pulse-slow': 'pulse 8s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-slow': 'bounce 2s infinite',
        'fade-in': 'fadeIn 0.7s ease-in forwards',
        'scale-in': 'scaleIn 0.4s ease-out'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        scaleIn: {
          '0%': { transform: 'scale(0.9)' },
          '100%': { transform: 'scale(1)' }
        }
      },
      screens: {
        'xs': '480px',
      }
    },
  },
  plugins: [],
};