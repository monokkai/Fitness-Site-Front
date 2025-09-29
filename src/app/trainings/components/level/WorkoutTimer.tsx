"use client";

import { Box, Text, Progress, VStack } from "@chakra-ui/react";

interface WorkoutTimerProps {
  timeLeft: number;
  isPlaying: boolean;
  selectedWorkout: number | null;
}

export default function WorkoutTimer({ timeLeft, isPlaying, selectedWorkout }: WorkoutTimerProps) {
  if (!selectedWorkout || !isPlaying) return null;

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const progress = ((60 - timeLeft) / 60) * 100;

  return (
    <Box
      bg="white"
      p={6}
      borderRadius="xl"
      boxShadow="lg"
      border="2px solid"
      borderColor="blue.200"
      w="full"
      maxW="400px"
    >
      <VStack spacing={4}>
        <Text fontSize="3xl" fontWeight="bold" color="blue.600">
          {minutes}:{seconds.toString().padStart(2, '0')}
        </Text>
        <Progress 
          value={progress} 
          colorScheme="blue" 
          size="lg" 
          w="100%" 
          borderRadius="full"
        />
        <Text fontSize="sm" color="gray.500">
          Time remaining
        </Text>
      </VStack>
    </Box>
  );
}