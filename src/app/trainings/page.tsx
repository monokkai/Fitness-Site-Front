"use client";

import { Box, Container } from "@chakra-ui/react";
import LayoutWrapper from "./components/LayoutWrapper";
import HeroSection from "./components/HeroSection";
import StatsSection from "./components/StatsSection";
import CategoriesSection from "./components/CategoriesSection";
import WorkoutsSection from "./components/WorkoutsSection";
import LearningPathSection from "./components/LearningPathSection";

export default function TrainingsPage(): React.ReactNode {
  return (
    <LayoutWrapper>
      <Box as="main" minH="100vh" bg="gray.50">
        <Container maxW="container.xl" py={10}>
          <HeroSection />
          <StatsSection />
          <CategoriesSection />
          <WorkoutsSection />
          <LearningPathSection />
        </Container>
      </Box>
    </LayoutWrapper>
  );
}
