export const nbrtlsm = {
  colors: {
    bg: "#FEF2E8",
    main: "#FFDC58",
    mainAccent: "#ffc800", // not needed for shadcn
  },
  borderRadius: {
    base: "5px",
  },
  boxShadow: {
    base: "4px 4px 0px 0px rgba(0,0,0,1)",
  },
  translate: {
    boxShadowX: "4px",
    boxShadowY: "4px",
  },
  fontWeight: {
    base: "500",
    heading: "700",
  },
  animation: {
    marquee: "marquee 20s linear infinite",
    marquee2: "marquee2 20s linear infinite",
  },
  keyframes: {
    marquee: {
      "0%": { transform: "translateX(0%)" },
      "100%": { transform: "translateX(-100%)" },
    },
    marquee2: {
      "0%": { transform: "translateX(100%)" },
      "100%": { transform: "translateX(0%)" },
    },
  },
};
