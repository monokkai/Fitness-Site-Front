"use client";

import { Box, Heading } from "@chakra-ui/react";
import InovateSection from "./InovateSection";
import PricingDemoSection from "./PricingDemoSection";

export default function PowerfulFeatures() {
  return (
    <Box
      id="features-section"
      py={{ base: 16, md: 24 }}
      px={{ base: 6, md: 12 }}
    >
      <Heading
        as="h5"
        size="sm"
        mb={6}
        color="gray.500"
        fontWeight="extrabold"
        textAlign="center"
      >
        INNOVATIVE FITNESS FEATURES
      </Heading>
      <InovateSection />
      <PricingDemoSection />
    </Box>
  );
}
