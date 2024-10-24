import type { Config } from 'tailwindcss'

export const colors = {
  teal: '#76ABAE',
  gold: '#c89703',
  dark_teal: '#5e8e91',
  black: '#222831',
  winter: '#31363F',
  white: '#ffff',
  dark_white: '#cccccc',
  error: '#ef4444',
}

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors,
    },
  },
}
export default config
