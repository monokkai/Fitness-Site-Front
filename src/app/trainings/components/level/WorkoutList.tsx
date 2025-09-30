"use client";

import {
  VStack,
  Heading,
  Alert,
  AlertIcon,
  Text,
  Card,
  CardBody,
  HStack,
  Icon,
  Badge,
} from "@chakra-ui/react";
import { FaDumbbell } from "react-icons/fa";
import { motion } from "framer-motion";
import { IWorkout } from "../../interfaces/IWorkout";

const MotionCard = motion.create(Card);

interface WorkoutListProps {
  workouts: IWorkout[];
  selectedWorkout: number | null;
  completedWorkouts: number[];
  isPlaying: boolean;
  onWorkoutSelect: (workoutId: number) => void;
}

export default function WorkoutList({ 
  workouts, 
  selectedWorkout, 
  completedWorkouts, 
  isPlaying, 
  onWorkoutSelect 
}: WorkoutListProps) {
  return (
    <VStack spacing={4} align="stretch">
      <Heading size="md" color="gray.700">
        Workouts ({workouts.length})
      </Heading>
      {workouts.length === 0 ? (
        <Alert status="info">
          <AlertIcon />
          <Text>No workouts available for this level yet.</Text>
        </Alert>
      ) : (
        workouts.map((workout) => {
          const isCompleted = completedWorkouts.includes(workout.id);
          const isCurrent = selectedWorkout === workout.id;
          
          return (
            <MotionCard
              key={workout.id}
              bg={isCompleted ? "green.50" : isCurrent ? "blue.50" : "white"}
              borderRadius="xl"
              border="2px solid"
              borderColor={isCompleted ? "green.300" : isCurrent ? "blue.300" : "gray.200"}
              boxShadow="md"
              cursor="pointer"
              onClick={() => !isPlaying && onWorkoutSelect(workout.id)}
              whileHover={{ scale: 1.02, boxShadow: "lg" }}
              whileTap={{ scale: 0.98 }}
              animate={{
                borderColor: isCompleted ? "#68D391" : isCurrent ? "#63B3ED" : "#E2E8F0",
                backgroundColor: isCompleted ? "#F0FFF4" : isCurrent ? "#EBF8FF" : "#FFFFFF"
              }}
              transition={{ duration: 0.2 }}
            >
              <CardBody p={4}>
                <VStack spacing={3} align="start">
                  <HStack>
                    <Icon as={FaDumbbell} color={isCompleted ? "green.600" : isCurrent ? "blue.600" : "blue.500"} />
                    <Heading size="sm" color={isCompleted ? "green.700" : isCurrent ? "blue.700" : "gray.800"}>
                      {workout.title}
                    </Heading>
                    {isCompleted && <Text color="green.500">✓</Text>}
                  </HStack>
                  <Text color="gray.600" fontSize="sm" noOfLines={2}>
                    {workout.description}
                  </Text>
                  <HStack spacing={2}>
                    <Badge
                      colorScheme={
                        workout.difficulty === "easy"
                          ? "green"
                          : workout.difficulty === "medium"
                            ? "orange"
                            : "red"
                      }
                      fontSize="xs"
                    >
                      {workout.difficulty}
                    </Badge>
                    <Badge colorScheme="blue" fontSize="xs">
                      {workout.duration}s
                    </Badge>
                  </HStack>
                </VStack>
              </CardBody>
            </MotionCard>
          );
        })
      )}
    </VStack>
  );
}