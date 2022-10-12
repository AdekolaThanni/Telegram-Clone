/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "var(--bg-primary)",
        secondary: "var(--bg-secondary)",
        "cta-icon": "var(--bg-cta-icon)",
        "message-highlight": "var(--bg-message-highlight)",
        message: "var(--bg-message)",
        "primary-text": "var(--text-primary)",
        "secondary-text": "var(--text-secondary)",
        "secondary-light-text": "var(--text-secondary-light)",
        "avatar-check": "var(--avatar-check)",
        scrollbar: "var(--scrollbar)",
        danger: "var(--danger)",
      },
    },
  },
  plugins: [],
};
