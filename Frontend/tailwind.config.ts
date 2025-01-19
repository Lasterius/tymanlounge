import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        blck: "#020705",
        drkgrn: "#355E3B",
        grn: "#4a9e57",
        wht: "#EFF7EE",
        gr: "#6b7280",
      },
      fontFamily: {
        heading: "var(--font-rubik)",
        mainPicture: "var(--font-eb-garamond)",
      },
    },
  },
  plugins: [],
};
export default config;
