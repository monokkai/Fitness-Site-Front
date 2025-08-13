import { extendTheme, ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

const theme = extendTheme({
  config,
  colors: {
    brand: {
      50: '#f0ffe0',
      100: '#d9ffb3',
      200: '#c2ff80',
      300: '#aaff03',
      400: '#8cdb00',
      500: '#6fb300',
      600: '#528a00',
      700: '#356100',
      800: '#183800',
      900: '#001000',
    },
  },
  fonts: {
    heading: "'Inter', sans-serif",
    body: "'Inter', sans-serif",
  },
  styles: {
    global: {
      html: {
        backgroundColor: "white !important",
        color: "#2D3748 !important",
      },
      body: {
        bg: "white !important",
        color: "gray.800 !important",
        fontFamily: "'Inter', sans-serif",
        letterSpacing: "-0.011em",
        backgroundImage: "none !important",
      },
      h1: { letterSpacing: "-0.02em", color: "gray.800" },
      h2: { letterSpacing: "-0.02em", color: "gray.800" },
      h3: { letterSpacing: "-0.02em", color: "gray.800" },
    },
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: "500",
        letterSpacing: "-0.01em",
      },
      variants: {
        solid: {
          bg: "brand.300",
          color: "black",
          _hover: { bg: "brand.400" },
        },
      },
    },
    Heading: {
      baseStyle: {
        fontWeight: "600",
        letterSpacing: "-0.02em",
      },
    },
    Text: {
      baseStyle: {
        letterSpacing: "-0.011em",
      },
    },
    AccordionButton: {
      baseStyle: {
        _hover: { bg: "rgba(0,0,0,0.05)" },
        _expanded: { bg: "rgba(0,0,0,0.08)" },
      },
    },
  },
});

export default theme;
