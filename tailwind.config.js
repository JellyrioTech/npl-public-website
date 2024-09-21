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
                    100: "#FFD1A9",
                    300: "#FFA454",
                    500: "#FF7F11",
                    700: "#C15A00",
                },
                tertiary: {
                    100: "#ACCBBF",
                    300: "#5D947E",
                    500: "#335145",
                    700: "#284036",
                },
            },
            neutral: {
                100: "#FFFFFC",
                300: "#E1E5DB",
                500: "#AEB1AA",
                900: "#020100",
            },
            backgroundImage: {
                "gradient-red":
                    "linear-gradient(to bottom, #890E24, 80%, #E2710F)",
                "gradient-green":
                    "linear-gradient(to bottom, #121D19, 80%, #1E4B3B)",
                "gradient-purple":
                    "linear-gradient(to bottom, #06002D, 17%, #8F1A91)",
            },
            fontFamily: {
                oswald: ['"Oswald"', "sans-serif"],
                roboto: ['"Roboto"', "sans-serif"],
                montserrat: ['"Montserrat"', "sans-serif"],

                regular: ['"Montserrat"', "sans-serif"],
                display: ['"Oswald"', "sans-serif"],
            },
            fontSize: {
                title1: ["20px"],
                title2: ["24px"],
                xTitle: ["32px"],
                xxTitle: ["40px"],
                xxxTitle: ["48px"],
                body1: ["16px"],
                body2: ["14px"],
                body3: ["12px"],
            },
            fontWeight: {
                light: "300",
                regular: "400",
                medium: "500",
                semibold: "600",
                bold: "700",
            },
        },
    },
    plugins: [
        // function ({ addUtilities, theme }) {
        //     const newUtilities = {
        //         xTitleLight: {
        //             fontSize: theme("fontSize.fontSize"),
        //         },
        //     };
        //     addUtilities(newUtilities);
        // },
    ],
};
