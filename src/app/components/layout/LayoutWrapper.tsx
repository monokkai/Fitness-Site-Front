"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Box } from "@chakra-ui/react";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const hideNavbarPaths = ["/auth", "/signup", "/trainings"];
  const shouldHideNavbar = hideNavbarPaths.some(path => pathname?.startsWith(path));

  return (
    <Box>
      {!shouldHideNavbar && <Navbar />}
      <Box as="main" className="bg-white text-white">
        {children}
      </Box>
      {!shouldHideNavbar && <Footer />}
    </Box>
  );
}
