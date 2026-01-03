/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{js,jsx,ts,tsx}",
    ],

    theme: {
        extend: {
            colors: {
                // Custom colors linked to DaisyUI variables
                primary: "var(--color-primary)",
                secondary: "var(--color-secondary)",
                base100: "var(--color-base-100)",
                base200: "var(--color-base-200)",
                base300: "var(--color-base-300)",
                neutral: "var(--color-neutral)",
            },
        },
    },

    plugins: [require("daisyui")],

    daisyui: {
        themes: [
            {
                light: {
                    "primary": "#133960",
                    "secondary": "#0e2a47",
                    "accent": "#22c55e",
                    "neutral": "#02020299",
                    "base-100": "#ffffff",
                    "base-200": "#f0f4f8",
                    "base-300": "#e3edf1",
                    "base-content": "#02020299",
                    "info": "#0ea5e9",
                    "success": "#22c55e",
                    "warning": "#facc15",
                    "error": "#ef4444",
                },
            },
            {
                dark: {
                    "primary": "#0a1e33",
                    "secondary": "#133960",
                    "accent": "#16a34a",
                    "neutral": "#e5e7eb",
                    "base-100": "#20354a",
                    "base-200": "#0a1420",
                    "base-300": "#09121c",
                    "base-content": "#e5e7eb",
                    "info": "#0ea5e9",
                    "success": "#16a34a",
                    "warning": "#f59e0b",
                    "error": "#dc2626",
                },
            },
        ],
    },

    darkMode: "class",
};
