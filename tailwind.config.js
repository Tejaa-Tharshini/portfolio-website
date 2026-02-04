/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                'sans': ['Inter', 'system-ui', 'sans-serif'],
                'display': ['Outfit', 'system-ui', 'sans-serif'],
            },
            colors: {
                // Teal/Cyan primary
                primary: {
                    50: '#ecfeff',
                    100: '#cffafe',
                    200: '#a5f3fc',
                    300: '#67e8f9',
                    400: '#22d3ee',
                    500: '#06b6d4',
                    600: '#0891b2',
                    700: '#0e7490',
                    800: '#155e75',
                    900: '#164e63',
                },
                // Purple/Pink accent
                accent: {
                    50: '#fdf4ff',
                    100: '#fae8ff',
                    200: '#f5d0fe',
                    300: '#f0abfc',
                    400: '#e879f9',
                    500: '#d946ef',
                    600: '#c026d3',
                    700: '#a21caf',
                    800: '#86198f',
                    900: '#701a75',
                },
                // Deep dark blue-black
                dark: {
                    50: '#f0f9ff',
                    100: '#e0f2fe',
                    200: '#bae6fd',
                    300: '#7dd3fc',
                    400: '#38bdf8',
                    500: '#0ea5e9',
                    600: '#0284c7',
                    700: '#0369a1',
                    800: '#0c1929',
                    850: '#0a1420',
                    900: '#060d16',
                    950: '#030810',
                }
            },
            animation: {
                'float': 'float 6s ease-in-out infinite',
                'glow': 'glow 2s ease-in-out infinite alternate',
                'slide-up': 'slideUp 0.5s ease-out',
                'fade-in': 'fadeIn 0.5s ease-out',
                'pulse-slow': 'pulse 3s ease-in-out infinite',
                'aurora': 'aurora 8s ease-in-out infinite',
                'shimmer': 'shimmer 3s ease-in-out infinite',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-20px)' },
                },
                glow: {
                    '0%': { boxShadow: '0 0 20px rgba(6, 182, 212, 0.3)' },
                    '100%': { boxShadow: '0 0 40px rgba(217, 70, 239, 0.5)' },
                },
                slideUp: {
                    '0%': { opacity: '0', transform: 'translateY(20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                aurora: {
                    '0%, 100%': { transform: 'translateY(0) rotate(0deg)', opacity: '0.5' },
                    '50%': { transform: 'translateY(-20px) rotate(5deg)', opacity: '0.8' },
                },
                shimmer: {
                    '0%': { backgroundPosition: '-200% 0' },
                    '100%': { backgroundPosition: '200% 0' },
                },
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'hero-gradient': 'linear-gradient(135deg, #030810 0%, #0a1420 50%, #030810 100%)',
                'aurora-gradient': 'linear-gradient(135deg, rgba(6, 182, 212, 0.15) 0%, rgba(217, 70, 239, 0.1) 50%, rgba(6, 182, 212, 0.15) 100%)',
                'cyber-gradient': 'linear-gradient(135deg, #06b6d4 0%, #d946ef 100%)',
            },
            boxShadow: {
                'glow': '0 0 20px rgba(6, 182, 212, 0.3), 0 0 40px rgba(217, 70, 239, 0.2)',
                'glow-lg': '0 0 30px rgba(6, 182, 212, 0.4), 0 0 60px rgba(217, 70, 239, 0.3)',
                'glow-cyan': '0 0 20px rgba(6, 182, 212, 0.5)',
                'glow-pink': '0 0 20px rgba(217, 70, 239, 0.5)',
            },
        },
    },
    plugins: [],
}
