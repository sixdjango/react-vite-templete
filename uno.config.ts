import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

export default defineConfig({
  shortcuts: [
    ['btn', 'px-40 py-10 rounded inline-block bg-teal-600 text-white cursor-pointer hover:bg-teal-700 disabled:cursor-default disabled:bg-gray-600 disabled:opacity-50'],
    ['icon-btn', 'bg-transparent inline-block cursor-pointer select-none  transition duration-200 ease-in-out opacity-70 hover:opacity-100 hover:bg-black/10 rounded-2'],
    ['absolute-center', '-translate-x-1/2  -translate-y-1/2 left-1/2 top-1/2 absolute'],
  ],
  theme: {
    fontSize: {
      '2xl': '24px',
      'xl': '20px',
      'lg': '16px',
      'md': '14px',
      'sm': '12px',
    },
    colors: {
      danger: '#C9353F',
      success: '#00A870',
      primary: {
        DEFAULT: 'var(--color-primary)',
        100: 'var(--color-primary-100)',
        500: 'var(--color-primary-500)',
        600: 'var(--color-primary-600)',
        700: 'var(--color-primary-700)',
      },
      neutral: {
        900: '#232725',
        800: '#353937',
        600: '#5D615F',
        500: '#757473',
        400: '#888B8A',
        100: '#DEDEDD',
        75: '#E6E7E6',
        50: '#F3F3F3',
        25: '#FAFAFA',
      },
    },
    boxShadow: {
      base: '2px 2px 20px 0px rgba(0, 0, 0, 0.08)',
    },
  },
  rules: [
    [/^fade-bottom-?(\d+)?$/, ([, d]) => ({ transform: `translate(0px, -${d || 60}px)`, opacity: 0 })],
    [/^fade-top-?(\d+)?$/, ([, d]) => ({ transform: `translate(0px, ${d || 60}px)`, opacity: 0 })],
    [/^fade-right-?(\d+)?$/, ([, d]) => ({ transform: `translate(${d || 60}px, 0px)`, opacity: 0 })],
    [/^fade-left-?(\d+)?$/, ([, d]) => ({ transform: `translate(-${d || 60}px, 0px)`, opacity: 0 })],
  ],
  // 安全选项，防止为编译 CSS 的类名被删除。 字符串数组
  safelist: [],
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
    }),
    presetTypography(),
    presetWebFonts({
      fonts: {
        sans: 'DM Sans',
        serif: 'DM Serif Display',
        mono: 'DM Mono',
      },
    }),
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
})
