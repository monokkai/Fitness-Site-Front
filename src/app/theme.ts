import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
  },
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
      body: {
        bg: 'white',
        color: 'gray.800',
        fontFamily: "'Inter', sans-serif",
        letterSpacing: "-0.011em",
        backgroundImage: 'none',
      },
      h1: {
        letterSpacing: "-0.02em",
        color: 'gray.800',
      },
      h2: {
        letterSpacing: "-0.02em",
        color: 'gray.800',
      },
      h3: {
        letterSpacing: "-0.02em",
        color: 'gray.800',
      },
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
          bg: 'brand.300',
          color: 'black',
          _hover: {
            bg: 'brand.400',
          },
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
  },
})

export default theme 