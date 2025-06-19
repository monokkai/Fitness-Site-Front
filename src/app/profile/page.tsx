"use client";

import { Box, Container, VStack } from "@chakra-ui/react";
import LayoutWrapper from "./components/LayoutWrapper";
import ProfileHeader from "./components/ProfileHeader";
import StatsGrid from "./components/StatsGrid";
import ProgressSection from "./components/ProgressSection";
import TrainingSettings from "./components/TrainingSettings";

const ProfilePage: React.FC = () => {
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
