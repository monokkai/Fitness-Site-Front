"use client";

import {
  Box,
  SimpleGrid,
  Card,
  CardBody,
  VStack,
  Text,
  Button,
  Badge,
} from "@chakra-ui/react";
import { motion, useReducedMotion } from "framer-motion";
import { useWorkoutStore } from "../../shared/store/workoutStore";
import useWorkouts from "../../shared/hooks/useWorkouts";
import WorkoutPlayer from "./WorkoutPlayer";

const MotionCard = motion(Card);

const WorkoutsSection: React.FC = () => {
  useWorkouts();
  const shouldReduceMotion = useReducedMotion();
  const { workouts, selectedWorkout, selectWorkout, loading } =
    useWorkoutStore();

  if (loading) return <Text>Loading workouts...</Text>;

  return (
    <Box mb={16}>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
        {workouts.length > 0 ? (
          workouts.map((workout) => (
            <MotionCard
              key={workout.id}
              initial={shouldReduceMotion ? {} : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              bg="white"
              borderRadius="lg"
              boxShadow="base"
            >
              <CardBody>
                <VStack align="start" spacing={4}>
                  <Text fontSize="xl" fontWeight="bold">
                    {workout.title}
                  </Text>
                  <Text color="gray.600">{workout.description}</Text>
                  <Badge colorScheme="blue">{workout.duration} sec</Badge>
                  <Button
                    colorScheme="blue"
                    onClick={() => selectWorkout(workout)}
                  >
                    Start Workout
                  </Button>
                </VStack>
              </CardBody>
            </MotionCard>
          ))
        ) : (
          <Text>No workouts available</Text>
        )}
      </SimpleGrid>

      {selectedWorkout && <WorkoutPlayer />}
    </Box>
  );
};

export default WorkoutsSection;
