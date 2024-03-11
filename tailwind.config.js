/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "noto-sans": ["Noto Sans Thai", "sans-serif"],
      },
      fontSize: {
        H1: "64px",
        H2: "58px",
        H3: "24px",
        subHead1: "32px",
        subHead2: "28px",
        body1: "18px",
        body2: "16px",
        body3: "12px",
        body4: "10px",
        subHeadEng1: "20px",
        bodyEngBold1: "16px",
        bodyEng2: "16px",
        bodyEng3: "12px"
      },
      colors: { //color here
        main: "#1ca59b",
        riskColor1:'#74C47B',
        riskColor2:'#8BD172',
        riskColor3:'#B1E374',
        riskColor4:'#CFEB73',
        riskColor5:'#EBD55B',
        riskColor6:'#EBC252',
        riskColor7:'#EBB249',
        riskColor8:'#EB9249',
        riskColor9:'#EB7650',
      }
    },
  },
  plugins: [],
}