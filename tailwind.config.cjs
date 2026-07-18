/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        black: '#0a0a0a',
        charcoal: '#1a1a1a',
        gold: '#d4a574',
        'gold-light': '#e8c9a0',
        mauve: '#8b6f8e',
        'mauve-light': '#b8a0b8',
        cream: '#f5f1e8',
        'gray-dark': '#3a3a3a',
      },
      fontFamily: {
        sans: ['Geist', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.8s ease-out',
        bounce: 'bounce 2s infinite',
      },
      keyframes: {
        fadeInUp: {
          '0%': {
            opacity: '0',
            transform: 'translateY(32px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        bounce: {
          '0%, 100%': {
            transform: 'translateY(0)',
          },
          '50%': {
            transform: 'translateY(-12px)',
          },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      letterSpacing: {
        'button': '0.75px',
        'label': '0.5px',
        'caption': '0.5px',
        'heading': '-0.5px',
      },
    },
  },
  plugins: [],
};
