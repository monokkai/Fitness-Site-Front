"use client";

import { VStack, HStack, Text, Box, Icon } from "@chakra-ui/react";
import { FaCheck } from "react-icons/fa";
import { IWorkout } from "../../interfaces/IWorkout";

interface WorkoutListProps {
  workouts: IWorkout[];
  completedWorkouts: number[];
  currentWorkoutIndex: number;
}

export const WorkoutList: React.FC<WorkoutListProps> = ({
  workouts,
  completedWorkouts,
  currentWorkoutIndex,
}) => (
  <VStack spacing={2} align="start" pt={4}>
    <Text fontWeight="bold">Workouts in this level:</Text>
    {workouts.map((workout, index) => (
      <HStack key={workout.id} spacing={3}>
        <Box
          w="20px"
          h="20px"
          borderRadius="50%"
          bg={
            completedWorkouts.includes(workout.id)
              ? "green.500"
              : index === currentWorkoutIndex
                ? "blue.500"
                : "gray.200"
          }
        />
        <Text
          color={
            completedWorkouts.includes(workout.id)
              ? "green.600"
              : index === currentWorkoutIndex
                ? "blue.600"
                : "gray.600"
          }
          fontWeight={index === currentWorkoutIndex ? "bold" : "normal"}
        >
          {workout.title}
        </Text>
        {completedWorkouts.includes(workout.id) && (
          <Icon as={FaCheck} color="green.500" />
        )}
      </HStack>
    ))}
  </VStack>
);
