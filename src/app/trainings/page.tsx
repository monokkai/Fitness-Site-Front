"use client";

import { useEffect } from "react";
import { Box, Container } from "@chakra-ui/react";
import LayoutWrapper from "./components/LayoutWrapper";
import HeroSection from "./components/HeroSection";
import StatsSection from "./components/StatsSection";
import CategoriesSection from "./components/CategoriesSection";
import WorkoutsSection from "./components/WorkoutsSection";
import LearningPathSection from "./components/LearningPathSection";
import { useAuthCheck } from "../shared/hooks/useAuthCheck";

const TrainingsPage = () => {
  const { checkAuth } = useAuthCheck();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <>
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
    </>
  );
};

export default TrainingsPage;
