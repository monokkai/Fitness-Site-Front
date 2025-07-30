"use client";

import { Box, Container, VStack } from "@chakra-ui/react";
import LayoutWrapper from "./components/LayoutWrapper";
import ProfileHeader from "./components/ProfileHeader";
import StatsGrid from "./components/StatsGrid";
import ProgressSection from "./components/ProgressSection";
import TrainingSettings from "./components/TrainingSettings";
import { useAuth } from "../shared/context/authContext";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import LoadingSpinner from "../components/LoadingSpinner";

const ProfilePage: React.FC = () => {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/auth");
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <LayoutWrapper>
        <LoadingSpinner />
      </LayoutWrapper>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <LayoutWrapper>
      <Box minH="100vh" bg="gray.50" pt={20}>
        <Container maxW="container.xl">
          <VStack spacing={8} align="stretch">
            <ProfileHeader />
            <StatsGrid />
            <ProgressSection />
            <TrainingSettings />
          </VStack>
        </Container>
      </Box>
    </LayoutWrapper>
  );
};

export default ProfilePage;
