import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary brand color used consistently throughout the standalone file.
        violet: {
          DEFAULT: "#7C3AED",
          600: "#6D28D9",
        },
        brand: {
          DEFAULT: "#7C3AED",
          hover: "#6D28D9",
        },
      },
      fontFamily: {
        sans: ["var(--font-poppins)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
