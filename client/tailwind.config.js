/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      // 1200px
      xl: { max: "75em" },
      // 1000px
      lg: { max: "62.5em" },
      // 750px
      md: { max: "46.88em" },
      // 550px
      sm: { max: "34.38em" },
      // 450px
      xs: { max: "28.13em" },
    },
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
        "avatar-check-read": "var(--avatar-check-read)",
        scrollbar: "var(--scrollbar)",
        danger: "var(--danger)",
        "box-shadow": "var(--box-shadow)",
        modal: "var(--bg-modal)",
        send: "var(--bg-send)",
        "message-status": "var(--message-status)",
        border: "var(--border)",
        search: "var(--bg-search)",
        "search-border": "var(--border-search)",
        "recorder-icon": "var(--recorder-icon)",
      },
    },
  },
  plugins: [],
};
