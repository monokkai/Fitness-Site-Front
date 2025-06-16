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
  Center,
} from "@chakra-ui/react";
import { Roadmap } from "./components/Roadmap";
import LayoutWrapper from "./components/LayoutWrapper";
import { FaFire, FaStar, FaTrophy, FaPlus } from "react-icons/fa";
import { motion } from "framer-motion";
import { FeaturedWorkout, TrainingCategory } from "./interfaces/ITraining";

const MotionBox = motion(Box);
const MotionCard = motion(Card);

export default function TrainingsPage(): React.ReactNode {
  const categories: TrainingCategory[] = [];
  const featuredWorkouts: FeaturedWorkout[] = [];

  const EmptyCategoryCard = () => (
    <MotionCard
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      cursor="pointer"
      _hover={{ transform: "translateY(-4px)", shadow: "lg" }}
      height="250px"
    >
      <CardBody>
        <Center height="100%">
          <VStack spacing={4}>
            <Icon as={FaPlus} w={8} h={8} color="gray.300" />
            <Text color="gray.500">No categories available</Text>
          </VStack>
        </Center>
      </CardBody>
    </MotionCard>
  );

  const EmptyWorkoutCard = () => (
    <MotionCard
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      cursor="pointer"
      _hover={{ transform: "translateY(-4px)", shadow: "lg" }}
      height="200px"
    >
      <CardBody>
        <Center height="100%">
          <VStack spacing={4}>
            <Icon as={FaPlus} w={8} h={8} color="gray.300" />
            <Text color="gray.500">No workouts available</Text>
          </VStack>
        </Center>
      </CardBody>
    </MotionCard>
  );

  return (
    <LayoutWrapper>
      <Box as="main" minH="100vh" bg="gray.50">
        <Container maxW="container.xl" py={10}>
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
                      0 XP
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
                      0 days
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
                      Level 0
                    </Text>
                    <Text color="gray.600">Current Level</Text>
                  </Stack>
                </VStack>
              </CardBody>
            </MotionCard>
          </SimpleGrid>

          <Box mb={16}>
            <Heading size="lg" mb={6}>
              Training Categories
            </Heading>
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8}>
              {categories.length > 0 ? (
                categories.map((category, index) => (
                  <MotionCard
                    key={category.id}
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
                ))
              ) : (
                <>
                  <EmptyCategoryCard />
                  <EmptyCategoryCard />
                  <EmptyCategoryCard />
                </>
              )}
            </SimpleGrid>
          </Box>

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
                          <Badge colorScheme="purple">
                            {workout.difficulty}
                          </Badge>
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

          <Box>
            <Heading size="lg" mb={6}>
              Learning Path
            </Heading>
            <Box
              mt={10}
              minH="300px"
              bg="white"
              p={6}
              borderRadius="xl"
              shadow="sm"
            >
              <Roadmap />
            </Box>
          </Box>
        </Container>
      </Box>
    </LayoutWrapper>
  );
}
