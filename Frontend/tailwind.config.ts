import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        blck: "#020705",
        drkgrn: "#092017",
        grn: "#355E3B",
        wht: "#EFF7EE",
        rng: "#D95706",
      },
      fontFamily: {
        heading: "var(--font-rubik)",
      },
    },
  },
  plugins: [],
};
export default config;
