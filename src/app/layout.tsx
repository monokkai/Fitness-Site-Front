import { Providers } from "./providers";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import LayoutWrapper from "./components/layout/LayoutWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "HandFit - Fitness App",
  description: "Fitness App with powerful features",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <LayoutWrapper>{children}</LayoutWrapper>
        </Providers>
      </body>
    </html>
  );
}
