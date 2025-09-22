"use client";

import { Center, VStack, Spinner, Text } from "@chakra-ui/react";

interface LoadingSpinnerProps {
  text?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  text = "Loading...",
}) => (
  <Center minH="100vh">
    <VStack>
      <Spinner size="xl" color="blue.500" thickness="4px" />
      <Text color="gray.600">{text}</Text>
    </VStack>
  </Center>
);
