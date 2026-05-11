/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#1F2329',
          light: '#3A3F47',
        },
        paper: {
          DEFAULT: '#FAFAF7',
          dark: '#1A1B1E',
          panel: '#F2F0EA',
          'panel-dark': '#24262B',
        },
        accent: {
          DEFAULT: '#9D2933',
          hover: '#B83340',
          cool: '#2E4E7E',
        },
        gold: '#C89B40',
        mute: {
          DEFAULT: '#8A857F',
          light: '#A8A39E',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Fraunces', 'Cormorant Garamond', 'Georgia', 'serif'],
        zh: ['"Noto Sans SC"', '"PingFang SC"', '"Source Han Sans"', 'sans-serif'],
        brush: ['"Ma Shan Zheng"', '"Noto Sans SC"', 'sans-serif'],
      },
      maxWidth: {
        prose: '70ch',
        page: '76rem',
      },
      boxShadow: {
        card: '0 1px 2px rgba(31, 35, 41, 0.04), 0 4px 12px rgba(31, 35, 41, 0.06)',
        'card-hover': '0 4px 8px rgba(31, 35, 41, 0.08), 0 12px 32px rgba(31, 35, 41, 0.12)',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
