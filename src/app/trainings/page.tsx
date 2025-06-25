"use client";

import { useEffect } from "react";
import { Box, Container } from "@chakra-ui/react";
import LayoutWrapper from "./components/LayoutWrapper";
import HeroSection from "./components/HeroSection";
import StatsSection from "./components/StatsSection";
import CategoriesSection from "./components/CategoriesSection";
import WorkoutsSection from "./components/WorkoutsSection";
import LearningPathSection from "./components/LearningPathSection";
import { useAuthGuardStore } from "../shared/store/authGuardStore";
import { AuthGuardPopup } from "@/app/components/ui/AuthGuardPopup";

const TrainingsPage = () => {
  const { checkAuth } = useAuthGuardStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <>
      <AuthGuardPopup />
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
