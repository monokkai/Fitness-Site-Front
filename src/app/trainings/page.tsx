"use client";

import { useEffect } from "react";
import { Box, Container, Spinner } from "@chakra-ui/react";
import LayoutWrapper from "./components/LayoutWrapper";
import HeroSection from "./components/main/HeroSection";
import { useAuth } from "../shared/context/authContext";
import { useRouter } from "next/navigation";
import StatsSection from "./components/main/StatsSection";
import CategoriesSection from "./components/CategoriesSection";

import LearningPathSection from "./components/LearningPathSection";

const TrainingsPage = () => {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/auth");
    }
  }, [user, isLoading, router]);

  if (isLoading || !user) {
    return (
      <LayoutWrapper>
        <Box
          as="main"
          minH="100vh"
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
          <LearningPathSection />
        </Container>
      </Box>
    </LayoutWrapper>
  );
};

export default TrainingsPage;
