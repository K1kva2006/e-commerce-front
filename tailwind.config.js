/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        screens: {
            phone: { max: "790px" },
            // => @media (min-width: 640px) { ... }
            small: { max: "580px" },
            tablet: { max: "864px" },
            // => @media (min-width: 640px) { ... }

            laptop: { max: "1024px" },
            // => @media (min-width: 1024px) { ... }

            desktop: { max: "1280px" },
            // => @media (min-width: 1280px) { ... }

            desktopXL: { max: "1300px" },
        },
    },
    plugins: [],
};
