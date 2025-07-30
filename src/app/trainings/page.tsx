"use client";

import { useEffect, useState } from "react";
import { Box, Container, Spinner } from "@chakra-ui/react";
import LayoutWrapper from "./components/LayoutWrapper";
import HeroSection from "./components/HeroSection";
import StatsSection from "./components/StatsSection";
import CategoriesSection from "./components/CategoriesSection";
import WorkoutsSection from "./components/WorkoutsSection";
import LearningPathSection from "./components/LearningPathSection";
import { useAuthCheck } from "../shared/hooks/useAuthCheck";

const TrainingsPage = () => {
  const { checkAuth } = useAuthCheck();
  const [isAuthChecked, setIsAuthChecked] = useState(false);

  useEffect(() => {
    const verifyAuth = async () => {
      const isAuthenticated = await checkAuth();
      setIsAuthChecked(true);

      if (!isAuthenticated) {
        return;
      }
    };

    verifyAuth();
  }, [checkAuth]);

  if (!isAuthChecked) {
    return (
      <LayoutWrapper>
        <Box
          as="main"
          minH="100vh"
          bg="gray.50"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Spinner size="xl" />
        </Box>
      </LayoutWrapper>
    );
  }

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
};

export default TrainingsPage;
