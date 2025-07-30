"use client";

import { Providers } from "./providers";
import "./globals.css";
import { Inter } from "next/font/google";
import LayoutWrapper from "./components/layout/LayoutWrapper";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./theme";
import { AuthProvider } from "./shared/context/authContext";

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
            <AuthProvider>
              <LayoutWrapper>{children}</LayoutWrapper>
            </AuthProvider>
          </Providers>
        </ChakraProvider>
      </body>
    </html>
  );
}
