"use client";

import { Box, VStack, Text } from "@chakra-ui/react";

interface VideoPlayerProps {
  selectedWorkout: number | null;
  isPlaying: boolean;
  currentWorkoutIndex: number;
  totalWorkouts: number;
  workoutTitle?: string;
}

export default function VideoPlayer({
  selectedWorkout,
  isPlaying,
  currentWorkoutIndex,
  totalWorkouts,
  workoutTitle,
}: VideoPlayerProps) {
  return (
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
      position="relative"
    >
      <VStack spacing={4}>
        {selectedWorkout && isPlaying ? (
          <VStack spacing={4}>
            <Text fontSize="lg" color="gray.300">
              {workoutTitle}
            </Text>
            <Text fontSize="sm" color="gray.400">
              Exercise {currentWorkoutIndex + 1} of {totalWorkouts}
            </Text>
          </VStack>
        ) : (
          <VStack spacing={4}>
            <Text fontSize="xl">Ready to start training?</Text>
            <Text fontSize="md" color="gray.400">
              Select an exercise and press play
            </Text>
          </VStack>
        )}
      </VStack>
    </Box>
  );
}