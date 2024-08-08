/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                primary: {
                    100: "#E3F8C4",
                    500: "#74B816",
                    900: "#314E09",
                },
                secondary: {
                    100: "#FFD1A9",
                    300: "#FFA454",
                    500: "#FF7F11",
                    700: "#C15A00",
                },
                tertiary: {
                    100: "#ACCBBF",
                    300: "#5D947E",
                    700: "#284036",
                },
            },
            fontFamily: {
                oswald: ['"Oswald"', "sans-serif"],
                roboto: ['"Roboto"', "sans-serif"],
            },
            neutral: {
                100: "#FFFFFC",
                300: "#E1E5DB",
                500: "#AEB1AA",
                900: "#020100",
            },
        },
    },
    plugins: [],
};
