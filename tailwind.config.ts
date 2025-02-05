/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
      extend: {
        fontFamily: {
          mono: ['"Ubuntu Mono"', "monospace"],
          major: ['"Major Mono Display"', "monospace"],
        },
      },
    },
    plugins: [],
  };
  