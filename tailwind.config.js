/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand
        'brand-ink': '#300101',
        'brand-canvas': '#FFFEFC',

        // Background
        'bg-page': '#FFFEFC',
        'bg-surface': '#FFFFFF',
        'bg-muted': '#F5F5F3',
        'bg-hover': '#EDEDEA',
        'bg-active': '#E0E0DC',
        'bg-accent': '#EEEDFF',

        // Text
        'text-primary': '#300101',
        'text-secondary': '#64645F',
        'text-tertiary': '#878784',
        'text-disabled': '#D0D0CB',
        'text-on-dark': '#FFFEFC',
        'text-accent': '#2216FF',

        // Border
        'border-default': '#E0E0DC',
        'border-strong': '#D0D0CB',
        'border-focus': '#2216FF',

        // Action
        'action-primary': '#2216FF',
        'action-primary-hover': '#1B11CC',
        'action-primary-active': '#140D99',
        'action-secondary': '#F5F5F3',
        'action-secondary-hover': '#EDEDEA',

        // Status
        'status-success': '#059669',
        'status-error': '#DC2626',

        // Accent
        'accent-orange': '#F58E39',
      },
      fontFamily: {
        'brand': ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        'body': ['"DM Sans"', 'system-ui', 'sans-serif'],
        'input': ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        'DEFAULT': '8px',
        'lg': '12px',
        'xl': '16px',
      },
    },
  },
  plugins: [],
}
