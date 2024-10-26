import type { Config } from 'tailwindcss'

export const colors = {
  light: {
    principal: '#76ABAE',
    principalHover: '#5e8e91',
    secondary: '#EEEEEE',
    winter: '#31363F',
    textPrimary: '#000000',
    background: '#FFFFFF',
    accent: '#c89703',
  },
  dark: {
    principal: '#19A7CE',
    principalHover: '#526D82',
    secondary: '#B6BBC4',
    winter: '#27374D',
    textPrimary: '#FFFFFF',
    background: '#000000',
    accent: '#c89703',
  },
}

const config: Config = {
  darkMode: 'class', // activar modo oscuro basado en clases
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ...colors.light,
        dark: colors.dark, // encapsula los colores oscuros
        principal_hover: '#5e8e91',
        neutral_dark: '#31363F',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
}
export default config
