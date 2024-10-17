import p from '@yc-tech/react-component/tailwindPlugin'
/** @type {import('tailwindcss').Config} */
export default {
  corePlugins: {
    // preflight: false // 关闭默认样式
  },
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@yc-tech/react-component/dist/react-component.es.js'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['PingFang SC', 'sans-serif']
      },
      colors: {
        danger: '#C9353F',
        success: '#00A870',
        warning: {
          DEFAULT: '#FFB800',
          50: '#FFFDF5',
          100: '#FFF9E0',
          200: '#FFF2B1',
          300: '#FFE982',
          400: '#FFD83D',
          500: '#FFB800',
          600: '#CC9400',
          700: '#996F00',
          800: '#664B00',
          900: '#332600'
        },
        neutral: {
          25: '#FAFAFA',
          50: '#F3F3F3',
          75: 'var(--color-neutral-75)',
          100: 'var(--color-neutral-100)',
          200: '#B6B8B7',
          300: '#ABAEB5'
        },
        primary: {
          DEFAULT: '#18978f',
          50: '#f7fcfb',
          100: '#e7f6f2',
          200: '#c7ebe1',
          300: '#82D3C1',
          400: '#12a594',
          500: '#18978f',
          600: '#006b70',
          700: '#003742'
        }
      },
      borderRadius: {
        xl: `calc(var(--radius) + 4px)`
      }
    }
  },
  darkMode: 'class',
  plugins: [require('tailwindcss-animate'), p()]
}
