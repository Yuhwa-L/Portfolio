/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1.5rem',
        md: '2rem',
        lg: '3rem',
      },
      screens: {
        '2xl': '1200px',
      },
    },
    extend: {
      colors: {
        bg: '#ffffff',
        surface: '#f5f5f7',
        'surface-2': '#fafafa',
        'text-primary': '#1d1d1f',
        'text-secondary': '#6e6e73',
        'text-tertiary': '#86868b',
        accent: '#0071e3',
        'accent-hover': '#0077ed',
        border: '#d2d2d7',
        'border-soft': '#e8e8ed',
      },
      fontFamily: {
        sans: [
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          '"SF Pro Display"',
          '"SF Pro Text"',
          '"Segoe UI"',
          'Roboto',
          'sans-serif',
        ],
      },
      letterSpacing: {
        eyebrow: '0.16em',
      },
      spacing: {
        section: '6rem',
        'section-lg': '9rem',
      },
      maxWidth: {
        'prose-tight': '42rem',
      },
      borderRadius: {
        '2xl': '1.25rem',
        '3xl': '1.75rem',
      },
      boxShadow: {
        card: '0 1px 2px rgba(0, 0, 0, 0.04), 0 4px 16px rgba(0, 0, 0, 0.04)',
        'card-hover':
          '0 4px 8px rgba(0, 0, 0, 0.04), 0 12px 32px rgba(0, 0, 0, 0.08)',
      },
      transitionTimingFunction: {
        apple: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
};
