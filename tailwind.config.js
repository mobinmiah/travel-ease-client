/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{js,jsx,ts,tsx}",
    ],

    theme: {
        extend: {},
    },

    plugins: [require("daisyui")],

    daisyui: {
        themes: [
            {
                light: {
                    ...require("daisyui/src/theming/themes")["light"],
                    "primary": "#3b82f6",       // Blue
                    "base-100": "#ffffff",      // Page background
                    "base-200": "#f4f4f5",      // Light section background
                    "base-300": "#d4d4d8",      // Borders/subtle areas
                    "base-content": "#1f2937",  // Main text color
                },
            },

            {
                dark: {
                    ...require("daisyui/src/theming/themes")["dark"],
                    "primary": "#60a5fa",       // Light-blue for dark mode
                    "base-100": "#0f172a",      // Deep navy background
                    "base-200": "#1e293b",
                    "base-300": "#334155",
                    "base-content": "#e2e8f0",  // Light text
                },
            },
        ],
    },
};
