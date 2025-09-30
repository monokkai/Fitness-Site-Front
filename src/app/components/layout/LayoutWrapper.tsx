"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Box } from "@chakra-ui/react";
import OnboardingPopup from "../OnboardingPopup";
import { useEffect, useState } from "react";
import { useAuth } from "../../shared/context/authContext";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { user, isLoading } = useAuth();
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);
  const hideNavbarPaths = ["/auth", "/signup", "/trainings", "/profile"];
  const shouldHideNavbar = hideNavbarPaths.some((path) =>
    pathname?.startsWith(path)
  );

  useEffect(() => {
    if (!isLoading && user) {
      const isQualified = localStorage.getItem("isQualified");
      if (!isQualified || isQualified === "false") {
        setIsOnboardingOpen(true);
      }
    }
  }, [user, isLoading, pathname]);

  return (
    <Box>
      {!shouldHideNavbar && <Navbar />}
      <Box as="main" className="bg-white text-white">
        <OnboardingPopup 
          isOpen={isOnboardingOpen} 
          onClose={() => setIsOnboardingOpen(false)} 
        />
        {children}
      </Box>
      {!shouldHideNavbar && <Footer />}
    </Box>
  );
}
