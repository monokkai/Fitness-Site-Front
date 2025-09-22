"use client";

import { usePathname } from "next/navigation";
import TrainingNavbar from "./main/TrainingNavbar";
import Footer from "../../components/layout/Footer";
import { Box } from "@chakra-ui/react";

const LayoutWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const pathname = usePathname();
  const hideNavbarPaths = ["/trainings"];
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
};

export default LayoutWrapper;
