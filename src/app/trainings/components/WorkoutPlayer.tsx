// components/WorkoutPlayer.tsx
"use client";

import { useState, useEffect } from "react";
import { Box, Button, VStack, Text, HStack } from "@chakra-ui/react";
import { useWorkoutStore } from "../../shared/store/workoutStore";

const WorkoutPlayer: React.FC = () => {
  const selectedWorkout = useWorkoutStore((state) => state.selectedWorkout);
  const selectWorkout = useWorkoutStore((state) => state.selectWorkout);

  const [timeLeft, setTimeLeft] = useState(selectedWorkout?.duration ?? 0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (!selectedWorkout) return;
    setTimeLeft(Number(selectedWorkout.duration));
    setIsRunning(false);
  }, [selectedWorkout]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isRunning && (timeLeft as number) > 0) {
      timer = setInterval(() => setTimeLeft((t: any) => t - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [isRunning, timeLeft]);

  const reset = () => {
    if (!selectedWorkout) return;
    setTimeLeft(Number(selectedWorkout.duration));
    setIsRunning(false);
  };

  return (
    <Box
      p={6}
      borderRadius="xl"
      shadow="md"
      bg="white"
      w={{ base: "90%", md: "500px" }}
      mx="auto"
      textAlign="center"
    >
      <VStack spacing={4}>
        <Text fontSize="2xl" fontWeight="bold">
          {selectedWorkout.title}
        </Text>
        <Text fontSize="4xl" fontWeight="bold" color="blue.500">
          {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, "0")}
        </Text>

        <HStack spacing={4}>
          {!isRunning ? (
            <Button colorScheme="green" onClick={() => setIsRunning(true)}>
              {timeLeft === selectedWorkout.duration ? "Start" : "Resume"}
            </Button>
          ) : (
            <Button colorScheme="yellow" onClick={() => setIsRunning(false)}>
              Pause
            </Button>
          )}
          <Button colorScheme="red" onClick={reset}>
            Reset
          </Button>
          <Button onClick={() => selectWorkout(null)}>Close</Button>
        </HStack>
      </VStack>
    </Box>
  );
};

export default WorkoutPlayer;
