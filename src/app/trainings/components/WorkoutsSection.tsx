"use client";

import {
  Badge,
  Box,
  Button,
  Card,
  CardBody,
  Flex,
  Heading,
  HStack,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import { motion, useReducedMotion } from "framer-motion";
import { FeaturedWorkout } from "../interfaces/ITraining";
import EmptyWorkoutCard from "./EmptyWorkoutCard";

const MotionCard = motion(Card);

const WorkoutsSection: React.FC = () => {
  const featuredWorkouts: FeaturedWorkout[] = [];
  const shouldReduceMotion = useReducedMotion();

  return (
    <Box mb={16}>
      <Heading size="lg" mb={6}>
        Featured Workouts
      </Heading>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
        {featuredWorkouts.length > 0 ? (
          featuredWorkouts.map((workout, index) => (
            <MotionCard
              key={workout.id}
              initial={shouldReduceMotion ? {} : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              cursor="pointer"
              bg="white"
              borderRadius="lg"
              boxShadow="base"
              whileHover={shouldReduceMotion ? {} : { y: -2, boxShadow: "md" }}
            >
              <CardBody>
                <VStack align="start" spacing={4}>
                  <Flex justify="space-between" w="full">
                    <Heading size="md">{workout.title}</Heading>
                    <Badge colorScheme="green">{workout.xp} XP</Badge>
                  </Flex>
                  <Text color="gray.600">{workout.description}</Text>
                  <HStack spacing={4}>
                    <Badge colorScheme="blue">{workout.duration}</Badge>
                    <Badge colorScheme="purple">{workout.difficulty}</Badge>
                  </HStack>
                  <Button colorScheme="blue" size="sm">
                    Start Workout
                  </Button>
                </VStack>
              </CardBody>
            </MotionCard>
          ))
        ) : (
          <>
            <EmptyWorkoutCard />
            <EmptyWorkoutCard />
          </>
        )}
      </SimpleGrid>
    </Box>
  );
};

export default WorkoutsSection; 