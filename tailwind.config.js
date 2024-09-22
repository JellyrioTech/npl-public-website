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
                black: "#121D19",
                neutral: {
                    100: "#FFFFFC",
                    300: "#E1E5DB",
                    500: "#AEB1AA",
                    700: "#626560",
                    900: "#020100",
                },
            },

            backgroundImage: {
                "gradient-red":
                    "linear-gradient(to bottom, #890E24, 80%, #E2710F)",
                "gradient-green":
                    "linear-gradient(to bottom, #121D19, 80%, #1E4B3B)",
                "gradient-titan":
                    "linear-gradient(to bottom, #06002D, 17%, #8F1A91)",
                "gradient-legends":
                    "linear-gradient(to bottom, #D0461B, 17%, #FFB118)",
                "gradient-hero":
                    "linear-gradient(to bottom, #0D4045, 17%, #197D66)",
            },
            fontFamily: {
                oswald: ['"Oswald"', "sans-serif"],
                roboto: ['"Roboto"', "sans-serif"],
                montserrat: ['"Montserrat"', "sans-serif"],

                regular: ['"Montserrat"', "sans-serif"],
                display: ['"Oswald"', "sans-serif"],
                special: ["Sarpanch", "sans-serif"],
            },
            fontSize: {
                regTitle: ["20px"], //title1
                lgTitle: ["24px"], // title2
                xlTitle: ["32px"], //xtitle
                "2xlTitle": ["40px"], //xxtitle
                "3xlTitle": ["48px"], //xxxtitle
                smBody: ["12px"], //body1
                regBody: ["14px"], //body2
                lgBody: ["16px"], //body3
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
        function ({ addUtilities }) {
            const newUtilities = {
                ".nspl-list": {
                    listStyleType: "none",
                },
                ".nspl-list li": {
                    padding: ".5rem 2rem",
                    backgroundImage: "url('./public/listIcon.png')",
                    backgroundPosition: "0% 20%",
                    backgroundRepeat: "no-repeat",
                },
            };
            addUtilities(newUtilities);
        },
    ],
};
