"use client";

import { Box } from "@chakra-ui/react";
import Hero from "./components/layout/Hero";
import DemoSection from "./components/DemoSection";
import FAQSection from "./components/FAQSection";
import { useState, useEffect } from "react";

export default function Home() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <Box>
      <Hero />
      <DemoSection />
      <FAQSection />
    </Box>
  );
}
