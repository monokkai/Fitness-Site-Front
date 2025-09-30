"use client";

import { Box, Text, VStack } from "@chakra-ui/react";

interface VideoPlayerProps {
  selectedWorkout: number | null;
  isPlaying: boolean;
  timeLeft: number;
  currentWorkoutTitle?: string;
}

export default function VideoPlayer({ selectedWorkout, isPlaying, timeLeft, currentWorkoutTitle }: VideoPlayerProps) {
  return (
    <VStack spacing={4}>
      <Box
        w={{ base: "100%", lg: "700px" }}
        h={{ base: "250px", lg: "400px" }}
        maxW="700px"
        bg="black"
        borderRadius="xl"
        display="flex"
        alignItems="center"
        justifyContent="center"
        color="white"
        fontSize="lg"
      >
        <Text>Video Player</Text>
      </Box>
      
      {selectedWorkout && isPlaying && (
        <Box textAlign="center">
          <Text fontSize="3xl" fontWeight="bold" color="blue.600">
            {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
          </Text>
          <Text fontSize="lg" color="gray.600">
            {currentWorkoutTitle}
          </Text>
        </Box>
      )}
    </VStack>
  );
}