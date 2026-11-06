import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#09090f",
        panel: "#12121d",
        violet: "#8b5cf6",
        cyan: "#22d3ee"
      },
      boxShadow: {
        glow: "0 0 45px rgba(139,92,246,.16)"
      }
    }
  },
  plugins: []
};

export default config;