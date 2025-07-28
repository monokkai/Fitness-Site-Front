"use client";

import { Box } from "@chakra-ui/react";
import Hero from "./components/layout/Hero";
import DemoSection from "./components/DemoSection";
import FAQSection from "./components/FAQSection";
import { useState, useEffect } from "react";
import { useUserStore } from "./shared/store/useUserStore";

export default function Home() {
  const [isClient, setIsClient] = useState(false);

  const fetchUser = useUserStore((state) => state.fetchUser);

  useEffect(() => {
    setIsClient(true);
    fetchUser();
  }, [fetchUser]);

  if (!isClient) return null;

  return (
    <Box bg="white">
      <Hero />
      <DemoSection />
      <FAQSection />
    </Box>
  );
}
