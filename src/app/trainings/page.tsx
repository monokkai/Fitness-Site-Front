"use client";

import {
  Box,
  Container,
  Heading,
  Text,
  SimpleGrid,
  Card,
  CardBody,
  Stack,
  Progress,
  HStack,
  VStack,
  Button,
  Icon,
  Badge,
  Flex,
} from "@chakra-ui/react";
import { Roadmap } from "./components/Roadmap";
import LayoutWrapper from "./components/LayoutWrapper";
import {
  FaDumbbell,
  FaFire,
  FaStar,
  FaTrophy,
  FaChartLine,
} from "react-icons/fa";
import { motion } from "framer-motion";

const MotionBox = motion(Box);
const MotionCard = motion(Card);

export default function TrainingsPage(): React.ReactNode {
  const categories = [
    {
      title: "Strength Training",
      description: "Exercises for strength and muscle mass development",
      progress: 65,
      icon: FaDumbbell,
      color: "blue.400",
    },
    {
      title: "Cardio",
      description: "Workouts for endurance and calorie burning",
      progress: 40,
      icon: FaFire,
      color: "red.400",
    },
    {
      title: "Flexibility",
      description: "Stretching and flexibility exercises",
      progress: 30,
      icon: FaChartLine,
      color: "purple.400",
    },
  ];

  const featuredWorkouts = [
    {
      title: "Workout of the Week",
      description: "Full body comprehensive workout",
      duration: "45 min",
      difficulty: "Medium",
      xp: 150,
    },
    {
      title: "Popular",
      description: "Intensive cardio training",
      duration: "30 min",
      difficulty: "Hard",
      xp: 200,
    },
  ];

  return (
    <LayoutWrapper>
      <Box as="main" minH="100vh" bg="gray.50">
        <Container maxW="container.xl" py={10}>
          {/* Hero Section */}
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            textAlign="center"
            mb={16}
            mt={12}
          >
            <Heading
              as="h1"
              size="2xl"
              mb={4}
              bgGradient="linear(to-r, blue.400, blue.600)"
              bgClip="text"
            >
              Your Training Journey
            </Heading>
            <Text fontSize="lg" color="gray.600" maxW="2xl" mx="auto">
              Follow your personalized training plan and reach new heights.
              Every workout brings you closer to your goal!
            </Text>
          </MotionBox>

          {/* Stats Section */}
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8} mb={12}>
            <MotionCard
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <CardBody>
                <VStack align="start" spacing={4}>
                  <Icon as={FaTrophy} w={8} h={8} color="yellow.400" />
                  <Stack spacing={2}>
                    <Text fontSize="2xl" fontWeight="bold">
                      1,250 XP
                    </Text>
                    <Text color="gray.600">Total Experience</Text>
                  </Stack>
                </VStack>
              </CardBody>
            </MotionCard>

            <MotionCard
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <CardBody>
                <VStack align="start" spacing={4}>
                  <Icon as={FaFire} w={8} h={8} color="orange.400" />
                  <Stack spacing={2}>
                    <Text fontSize="2xl" fontWeight="bold">
                      7 days
                    </Text>
                    <Text color="gray.600">Current Streak</Text>
                  </Stack>
                </VStack>
              </CardBody>
            </MotionCard>

            <MotionCard
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <CardBody>
                <VStack align="start" spacing={4}>
                  <Icon as={FaStar} w={8} h={8} color="purple.400" />
                  <Stack spacing={2}>
                    <Text fontSize="2xl" fontWeight="bold">
                      Level 5
                    </Text>
                    <Text color="gray.600">Current Level</Text>
                  </Stack>
                </VStack>
              </CardBody>
            </MotionCard>
          </SimpleGrid>

          {/* Categories Section */}
          <Box mb={16}>
            <Heading size="lg" mb={6}>
              Training Categories
            </Heading>
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8}>
              {categories.map((category, index) => (
                <MotionCard
                  key={category.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  cursor="pointer"
                  _hover={{ transform: "translateY(-4px)", shadow: "lg" }}
                >
                  <CardBody>
                    <VStack align="start" spacing={4}>
                      <Icon
                        as={category.icon}
                        w={6}
                        h={6}
                        color={category.color}
                      />
                      <Stack spacing={2}>
                        <Heading size="md">{category.title}</Heading>
                        <Text color="gray.600">{category.description}</Text>
                        <Box w="full">
                          <Text mb={2} fontSize="sm">
                            Progress: {category.progress}%
                          </Text>
                          <Progress
                            value={category.progress}
                            colorScheme={category.color.split(".")[0]}
                            borderRadius="full"
                          />
                        </Box>
                      </Stack>
                    </VStack>
                  </CardBody>
                </MotionCard>
              ))}
            </SimpleGrid>
          </Box>

          {/* Featured Workouts */}
          <Box mb={16}>
            <Heading size="lg" mb={6}>
              Featured Workouts
            </Heading>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
              {featuredWorkouts.map((workout, index) => (
                <MotionCard
                  key={workout.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  cursor="pointer"
                  _hover={{ transform: "translateY(-4px)", shadow: "lg" }}
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
              ))}
            </SimpleGrid>
          </Box>

          {/* Training Path */}
          <Box>
            <Heading size="lg" mb={6}>
              Learning Path
            </Heading>
            <Box mt={10}>
              <Roadmap />
            </Box>
          </Box>
        </Container>
      </Box>
    </LayoutWrapper>
  );
}
