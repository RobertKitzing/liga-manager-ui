/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  darkMode: 'class',
  content: [
    "./src/**/*.{html,ts}",
  ],
  safelist: [
    'bg-warn-100',
    'bg-success-100',
    'text-warn-c100',
    'text-success-c100',
    'border-2',
    'rounded'
  ],
}
