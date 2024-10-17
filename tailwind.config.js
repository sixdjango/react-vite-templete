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
      }
    }
  },
  darkMode: 'class',
  plugins: [require('tailwindcss-animate'), p()]
}
