/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        theme: {
          DEFAULT: 'var(--theme-primary-500)',
          cdefault: 'var(--theme-primary-contrast-500)',
          50: 'var(--theme-primary-50)',
          100: 'var(--theme-primary-100)',
          200: 'var(--theme-primary-200)',
          300: 'var(--theme-primary-300)',
          400: 'var(--theme-primary-400)',
          500: 'var(--theme-primary-500)',
          600: 'var(--theme-primary-600)',
          700: 'var(--theme-primary-700)',
          800: 'var(--theme-primary-800)',
          900: 'var(--theme-primary-900)',
          A100: 'var(--theme-primary-A100)',
          A200: 'var(--theme-primary-A200)',
          A400: 'var(--theme-primary-A400)',
          A700: 'var(--theme-primary-A700)',
          c50: 'var(--theme-primary-contrast-50)',
          c100: 'var(--theme-primary-contrast-100)',
          c200: 'var(--theme-primary-contrast-200)',
          c300: 'var(--theme-primary-contrast-300)',
          c400: 'var(--theme-primary-contrast-400)',
          c500: 'var(--theme-primary-contrast-500)',
          c600: 'var(--theme-primary-contrast-600)',
          c700: 'var(--theme-primary-contrast-700)',
          c800: 'var(--theme-primary-contrast-800)',
          c900: 'var(--theme-primary-contrast-900)',
          cA100: 'var(--theme-primary-contrast-A100)',
          cA200: 'var(--theme-primary-contrast-A200)',
          cA400: 'var(--theme-primary-contrast-A400)',
          cA700: 'var(--theme-primary-contrast-A700)',
        },
      }
    },
  },
  plugins: [],
}
