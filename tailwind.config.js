/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                primary: {
                    100: "#E3F8C4",
                    500: "#74B816",
                    700: "#5B8F11",
                    900: "#314E09",
                },
                secondary: {
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
            backgroundImage: {
                redGradient:
                    "linear-gradient(to bottom, #890E24, 80%, #E2710F)",
                greenGradient:
                    "linear-gradient(to bottom, #1E4B3B, 80%, #121D19)",
            },
        },
    },
    plugins: [],
};
