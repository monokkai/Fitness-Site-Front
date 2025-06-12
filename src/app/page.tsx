"use client";

import { Box } from "@chakra-ui/react";
import Hero from "./components/layout/Hero";
import DemoSection from "./components/DemoSection";
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
    </Box>
  );
}
