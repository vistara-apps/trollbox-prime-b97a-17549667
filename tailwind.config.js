module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        primary: 'hsl(240 100% 50%)',
        accent: 'hsl(30 90% 50%)',
        bg: 'hsl(235 10% 15%)',
        surface: 'hsl(235 10% 20%)',
        text: 'hsl(235 10% 90%)',
        muted: 'hsl(235 10% 60%)',
      },
      spacing: {
        sm: '8px',
        md: '12px',
        lg: '20px',
      },
      borderRadius: {
        sm: '6px',
        md: '10px',
        lg: '16px',
      },
      boxShadow: {
        card: '0 4px 12px hsla(0, 0%, 0%, 0.2)',
      },
      animation: {
        'fade-in': 'fadeIn 200ms ease-in-out',
        'slide-up': 'slideUp 200ms ease-in-out',
      },
    },
  },
  plugins: [],
}
