const defaultTheme = require("tailwindcss/defaultTheme");
const plugin = require("tailwindcss/plugin");

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/constants/**/*.{js,ts}",
  ],
  darkMode: "class",
  theme: {
    fontFamily: {
      sans: ["Work Sans", ...defaultTheme.fontFamily.sans],
    },
    screens: {
      xs: "320px",
      sm: "568px",
      md: "744px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1512px",
    },
    extend: {
      backgroundColor: (theme) => ({
        darkgray: "#24242B",
        appbar: "#18181D",
      }),
      textColor: (theme) => ({
        subwhite: "#8899A6",
        logo: "#F1F1F3",
        basegray: "#C5C5C5",
      }),
      fontSize: {
        "2xs": ["0.5rem", "0.75rem"],

        // V2 UI Fonts
        display: {
          sm: ["2.25rem", "2.25rem"],
          md: ["2.8125rem", "3.25rem"],
          lg: ["3.5625rem", "4rem"],
        },
        headline: {
          sm: ["1.5rem", "2rem"],
          md: ["1.75rem", "2.25rem"],
          lg: ["2rem", "2.5rem"],
        },
        title: {
          sm: ["0.875", "1.25rem"],
          md: ["1rem", "1.5rem"],
          lg: ["1.375rem", "1.75rem"],
        },
        label: {
          sm: ["0.6875rem", "1rem"],
          md: ["0.75rem", "1rem"],
          lg: ["0.875rem", "1.25rem"],
        },
        body: {
          sm: ["0.75rem", "1rem"],
          md: ["0.875rem", "1.25rem"],
          lg: ["1rem", "1.5rem"],
        },
      },
      colors: {
        // UI V1 Colors

        // Unique Colors
        primary: "#8E477F",
        "primary-300": "#A66497",
        "primary-light": "#3d6be2",
        secondary: "#EFA9E0",
        "secondary-light": "#ED74E1",

        // Neutral Colors
        ground: "#24242B",
        glass: "#303034",
        "glass-stroke": "#505050",
        onglass: "#C5C5C5",
        "onglass-weak": "#A0A0A0",
        acrylic: "#2A2A2D",
        "acrylic-light": "#3A3A40",
        onacrylic: "#C5C5C5",
        card: "#44444E",
        oncard: "#FFFFFF",

        // Gradient factors
        border_l: "#D88080",
        border_r: "#DB85C8",

        // Gradient factors
        accent_l: "#459BFF",
        accent_r: "#68DFD8",

        // Specific Colors
        done: "#33C102",
        progress: "#D4BD1B",
        suspended: "#AF1E1E",
        text: {
          primary: "#8E477F",
          white: "#FFFFFF",
        },

        // UI V2 Colors
        light: {
          primary: "rgba(154, 0, 205, 1)",
          "on-primary": "rgba(255, 255, 255, 1)",
          "primary-container": "rgba(251, 215, 255, 1)",
          "on-primary-container": "rgba(50, 0, 70, 1)",
          secondary: "rgba(167, 0, 174, 1)",
          "on-secondary": "rgba(255, 255, 255, 1)",
          "secondary-container": "rgba(255, 214, 248, 1)",
          "on-secondary-container": "rgba(55, 0, 58, 1)",
          tertiary: "rgba(128, 86, 0, 1)",
          "on-tertiary": "rgba(255, 255, 255, 1)",
          "tertiary-container": "rgba(255, 221, 170, 1)",
          "on-tertiary-container": "rgba(40, 24, 0, 1)",
          error: "rgba(186, 27, 27, 1)",
          "error-container": "rgba(255, 218, 212, 1)",
          "on-error": "rgba(255, 255, 255, 1)",
          "on-error-container": "rgba(65, 0, 1, 1)",
          background: "rgba(252, 252, 252, 1)",
          "on-background": "rgba(30, 26, 30, 1)",
          surface: "rgba(252, 252, 252, 1)",
          "on-surface": "rgba(30, 26, 30, 1)",
          "surface-variant": "rgba(235, 223, 233, 1)",
          "on-surface-variant": "rgba(76, 68, 77, 1)",
          outline: "rgba(126, 116, 126, 1)",
          "inverse-on-surface": "rgba(247, 239, 243, 1)",
          "inverse-surface": "rgba(51, 47, 51, 1)",
          "inverse-primary": "rgba(240, 175, 255, 1)",
          shadow: "rgba(0, 0, 0, 1)",
        },
        dark: {
          primary: "rgba(240, 175, 255, 1)",
          "on-primary": "rgba(83, 0, 113, 1)",
          "primary-container": "rgba(117, 0, 157, 1)",
          "on-primary-container": "rgba(251, 215, 255, 1)",
          secondary: "rgba(255, 169, 249, 1)",
          "on-secondary": "rgba(90, 0, 94, 1)",
          "secondary-container": "rgba(128, 0, 133, 1)",
          "on-secondary-container": "rgba(255, 214, 248, 1)",
          tertiary: "rgba(255, 186, 66, 1)",
          "on-tertiary": "rgba(68, 44, 0, 1)",
          "tertiary-container": "rgba(97, 64, 0, 1)",
          "on-tertiary-container": "rgba(255, 221, 170, 1)",
          error: "rgba(255, 180, 169, 1)",
          "error-container": "rgba(147, 0, 6, 1)",
          "on-error": "rgba(104, 0, 3, 1)",
          "on-error-container": "rgba(255, 218, 212, 1)",
          background: "rgba(30, 26, 30, 1)",
          "on-background": "rgba(232, 224, 229, 1)",
          surface: "rgba(30, 26, 30, 1)",
          "on-surface": "rgba(232, 224, 229, 1)",
          "surface-variant": "rgba(76, 68, 77, 1)",
          "on-surface-variant": "rgba(207, 195, 205, 1)",
          outline: "rgba(152, 142, 151, 1)",
          "inverse-on-surface": "rgba(30, 26, 30, 1)",
          "inverse-surface": "rgba(232, 224, 229, 1)",
          "inverse-primary": "rgba(154, 0, 205, 1)",
          shadow: "rgba(0, 0, 0, 1)",
        },
      },
      dropShadow: {
        base: "4px 4px 2px rgba(0, 0, 0, 0.25)",
        high: "10px 10px 10px rgba(0, 0, 0, 0.5)",
        higher: "20px 20px 20px rgba(0, 0, 0, 0.5)",
        "xl-white": "0 20px 13px rgba(255, 255, 255, 1.0)",
        "xl-pink": "0 2px 7px rgba(239, 169, 224, 1.0)",
      },
      maxHeight: {
        "4/5": "80%",
      },
      minHeight: {
        44: "11rem",
        24: "6rem",
      },
      maxWidth: {
        modal: "708px",
        toast: "4rem",
      },
      animation: {
        "slide-in": "slide-in 0.5s ease forwards",
        "fade-out": "fade-out 0.5s ease forwards",
        "slide-from-right": "slide-from-right 0.3s ease forwards",
        "slide-to-right": "slide-to-right 0.3s ease forwards",
      },
      keyframes: {
        "slide-in": {
          "0%": { transform: "translateY(-50%)", opacity: 0 },
          "100%": { transform: "translateY(0)", opacity: 1 },
        },
        "fade-out": {
          "0%": { transform: "scale(1)", opacity: 1 },
          "100%": { transform: "scale(0.2)", opacity: 0 },
        },
        "slide-from-right": {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0)" },
        },
        "slide-to-right": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(100%)" },
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities(
        {
          ".scrollbar-hide": {
            /* IE and Edge */
            "-ms-overflow-style": "none",

            /* Firefox */
            "scrollbar-width": "none",

            /* Safari and Chrome */
            "&::-webkit-scrollbar": {
              display: "none",
            },
          },

          ".scrollbar-default": {
            /* IE and Edge */
            "-ms-overflow-style": "auto",

            /* Firefox */
            "scrollbar-width": "auto",

            /* Safari and Chrome */
            "&::-webkit-scrollbar": {
              display: "block",
            },
          },
        },
        ["responsive"]
      );
    }),
  ],
};
