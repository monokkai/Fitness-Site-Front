"use client";

import { usePathname } from "next/navigation";
import TrainingNavbar from "../../trainings/components/TrainingNavbar";
import Footer from "../../components/layout/Footer";
import { Box } from "@chakra-ui/react";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const hideNavbarPaths = ["/profile"];
  const shouldHideNavbar = hideNavbarPaths.some((path) =>
    pathname?.startsWith(path)
  );

  return (
    <Box>
      <TrainingNavbar />
      <Box as="main" className="bg-white text-white">
        {children}
      </Box>
      {!shouldHideNavbar && <Footer />}
    </Box>
  );
}
