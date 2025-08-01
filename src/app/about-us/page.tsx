"use client";

import { Box, useColorModeValue } from "@chakra-ui/react";
import HeroSection from "./components/HeroSection";
import ValuesSection from "./components/ValuesSection";

export default function AboutUsPage() {
  const bg = useColorModeValue("white", "gray.900");

  return (
    <Box bg={bg}>
      <HeroSection />
      <ValuesSection />
    </Box>
  );
}
