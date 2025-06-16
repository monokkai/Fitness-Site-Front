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
import { motion } from "framer-motion";
import { FeaturedWorkout } from "../interfaces/ITraining";
import EmptyWorkoutCard from "./EmptyWorkoutCard";

const MotionCard = motion(Card);

const WorkoutsSection: React.FC = () => {
  const featuredWorkouts: FeaturedWorkout[] = [];

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
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              cursor="pointer"
              _hover={{ transform: "translateY(-4px)", shadow: "lg" }}
              bg="white"
              borderRadius="lg"
              boxShadow="base"
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
          <Box>
            <EmptyWorkoutCard />
            <EmptyWorkoutCard />
          </Box>
        )}
      </SimpleGrid>
    </Box>
  );
};

export default WorkoutsSection;
