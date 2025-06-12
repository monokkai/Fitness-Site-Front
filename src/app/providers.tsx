"use client";

import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import theme from "./theme";

export function Providers({ children }: { children: React.ReactNode }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <>
      <ColorModeScript initialColorMode="light" />
      <ChakraProvider theme={theme}>
        {children}
      </ChakraProvider>
    </>
  );
}
