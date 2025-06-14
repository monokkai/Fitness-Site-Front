"use client";

import { Box, Container, Heading, Text } from "@chakra-ui/react";
import { Roadmap } from "./components/Roadmap";
import LayoutWrapper from "../components/layout/LayoutWrapper";

export default function TrainingsPage() {
  return (
    <LayoutWrapper>
      <Box as="main" minH="100vh" bg="gray.50">
        <Container maxW="container.xl" py={10}>
          <Box textAlign="center" mb={16}>
            <Heading
              as="h1"
              size="2xl"
              mb={4}
              bgGradient="linear(to-r, blue.400, blue.600)"
              bgClip="text"
            >
              Your Training Journey
            </Heading>
            <Text fontSize="lg" color="gray.600">
              Complete levels to master your skills
            </Text>
          </Box>
          <Box mt={10}>
            <Roadmap />
          </Box>
        </Container>
      </Box>
    </LayoutWrapper>
  );
}
