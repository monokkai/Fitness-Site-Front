"use client";

import { Providers } from "./providers";
import "./globals.css";
import { Inter } from "next/font/google";
import LayoutWrapper from "./components/layout/LayoutWrapper";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./theme";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ChakraProvider theme={theme}>
          <Providers>
            <LayoutWrapper>{children}</LayoutWrapper>
          </Providers>
        </ChakraProvider>
      </body>
    </html>
  );
}
