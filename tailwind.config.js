/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx}", "./components/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        anansi: {
          // Dark surfaces — layered, warm, never flat
          black: "#050505",         // void_black — primary dark bg
          deep: "#000000",          // deepest — behind elevated surfaces
          surface: "#0E0E10",       // cards / elevated blocks
          elevated: "#161618",      // hover states, lifted surfaces

          // Command red — the signature (brand system B, derived from hunt_red #C1121F)
          red: "#C1121F",           // hunt_red — primary brand red
          "red-deep": "#9E0E18",    // hover / pressed states
          "red-glow": "#E11D2A",    // red-bright — focus rings, glows, gradients
          "red-bright": "#E11D2A",  // alias for red-glow
          "red-muted": "#7A0B14",   // restrained contexts (legacy /caribcoin page compatibility)

          // Whites — layered tints
          white: "#F7F7F2",         // ash_white — warm white for light sections
          "white-pure": "#FFFFFF",

          // Grays — real tones, not just opacity
          "gray-50":  "#F4F4F5",
          "gray-200": "#E4E4E7",
          "gray-300": "#D4D4D8",
          "gray-400": "#A1A1AA",    // readable body text on dark
          "gray-500": "#71717A",    // secondary text on dark
          "gray-600": "#52525B",    // tertiary
          "gray-700": "#3F3F46",
          gray:       "#6B6B6B",    // legacy alias
          "gray-dark": "#27272A",

          // Lines — warmer, more subtle
          line: "#1F1F23",           // lines on dark bg
          "line-subtle": "#151518",  // barely-there dividers
          "line-light": "#E4E4E7",   // lines on light bg

          // Legacy (keep for /caribcoin and /spice pages — don't break them)
          cream: "#FAFAF5",
          light: "#F5F5F0",
          border: "#E6E6E6",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      boxShadow: {
        "red-glow": "0 10px 24px rgba(0, 0, 0, 0.24)",
        "red-glow-soft": "0 8px 18px rgba(0, 0, 0, 0.18)",
        "red-glow-intense": "0 14px 28px rgba(0, 0, 0, 0.28)",
        "surface-lift": "0 1px 0 0 rgba(255, 255, 255, 0.04) inset, 0 0 0 1px rgba(255, 255, 255, 0.02)",
      },
      backgroundImage: {
        "grain": "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3CfeColorMatrix values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.08 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
      },
    },
  },
  plugins: [],
};
