"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Box } from "@chakra-ui/react";
import OnboardingPopup from "../OnboardingPopup";
import { useEffect } from "react";
import { useAuth } from "../../shared/context/authContext";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { user, isLoading } = useAuth();
  const hideNavbarPaths = ["/auth", "/signup", "/trainings", "/profile"];
  const shouldHideNavbar = hideNavbarPaths.some((path) =>
    pathname?.startsWith(path)
  );

  useEffect(() => {
    if (!isLoading && user) {
      const isQualified = localStorage.getItem("isQualified");
      if (!isQualified || isQualified === "false") {
      }
    }
  }, [user, isLoading, pathname]);

  return (
    <Box>
      {!shouldHideNavbar && <Navbar />}
      <Box as="main" className="bg-white text-white">
        <OnboardingPopup />
        {children}
      </Box>
      {!shouldHideNavbar && <Footer />}
    </Box>
  );
}
