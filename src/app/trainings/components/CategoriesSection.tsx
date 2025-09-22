"use client";

import {
  Box,
  Card,
  CardBody,
  Heading,
  SimpleGrid,
  Text,
  VStack,
  Button,
  Badge,
  HStack,
  Center,
  Spinner,
  Alert,
  AlertIcon,
  Icon,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { FaUnlock, FaDumbbell, FaRedo, FaSignInAlt } from "react-icons/fa";
import { useAuth } from "../../shared/context/authContext";
import { useRouter } from "next/navigation";
import { API_URL } from "@/app/shared/config/api.config";

const MotionCard = motion.create(Card);

interface Workout {
  id: number;
  title: string;
  description: string;
  duration: number;
  difficulty: string;
  category: string;
}

interface Level {
  id: number;
  title: string;
  description: string;
  workouts: Workout[];
  required_xp: number;
  order: number;
}

const CategoriesSection: React.FC = () => {
  const { user, isLoading: authLoading } = useAuth();
  const router = useRouter();
  const [levels, setLevels] = useState<Level[]>([]);
  const [userXp, setUserXp] = useState(0);
  const [currentLevel, setCurrentLevel] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user && !authLoading) {
      fetchUserData();
    } else if (!authLoading && !user) {
      setLoading(false);
      setError("Please login to access training program");
    }
  }, [user, authLoading]);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem("session_token");

      if (!token) {
        throw new Error("Authentication token not found");
      }

      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      const [workoutsResponse, userProfileResponse] = await Promise.all([
        fetch(`${API_URL}/workouts`, { headers }),
        fetch(`${API_URL}/api/users/profile`, { headers }),
      ]);

      if (!workoutsResponse.ok) {
        throw new Error("Failed to fetch workouts");
      }

      const workoutsData = await workoutsResponse.json();
      let userProfileData = { totalXP: 0, currentLevel: 1 };

      if (userProfileResponse.ok) {
        userProfileData = await userProfileResponse.json();
      }

      setUserXp(userProfileData.totalXP || 0);
      setCurrentLevel(userProfileData.currentLevel || 1);

      const groupedLevels = groupWorkoutsIntoLevels(workoutsData);
      setLevels(groupedLevels);
    } catch (error) {
      setError(error instanceof Error ? error.message : "Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  const groupWorkoutsIntoLevels = (workouts: Workout[]): Level[] => {
    const levelsMap = new Map<number, Workout[]>();

    workouts.forEach((workout) => {
      const level = 1;
      if (!levelsMap.has(level)) {
        levelsMap.set(level, []);
      }
      levelsMap.get(level)!.push(workout);
    });

    return Array.from(levelsMap.entries()).map(([level, levelWorkouts]) => ({
      id: level,
      title: `Level ${level}`,
      description: "Complete all exercises to unlock next level",
      workouts: levelWorkouts,
      required_xp: 0,
      order: level,
    }));
  };

  const handleLevelClick = (levelId: number) => {
    router.push(`/trainings/${levelId}`);
  };

  if (authLoading) {
    return (
      <Center minH="400px">
        <Spinner size="xl" color="blue.500" />
      </Center>
    );
  }

  if (!user) {
    return (
      <Center minH="400px">
        <VStack spacing={6}>
          <Alert status="info">
            <AlertIcon />
            <Text>Please login to access training program</Text>
          </Alert>
          <Button
            colorScheme="blue"
            leftIcon={<FaSignInAlt />}
            onClick={() => router.push("/auth")}
            size="lg"
          >
            Login
          </Button>
        </VStack>
      </Center>
    );
  }

  if (loading) {
    return (
      <Center minH="400px">
        <VStack spacing={4}>
          <Spinner size="xl" color="blue.500" />
          <Text color="gray.600">Loading training program...</Text>
        </VStack>
      </Center>
    );
  }

  if (error) {
    return (
      <Center minH="400px">
        <VStack spacing={4}>
          <Alert status="error">
            <AlertIcon />
            <Text>{error}</Text>
          </Alert>
          <Button
            colorScheme="blue"
            leftIcon={<FaRedo />}
            onClick={fetchUserData}
          >
            Retry
          </Button>
        </VStack>
      </Center>
    );
  }

  return (
    <Box mb={16}>
      <VStack spacing={6} align="stretch" mb={8}>
        <Heading size="lg">Training Levels</Heading>
        <HStack spacing={4}>
          <Badge colorScheme="blue" fontSize="lg">
            Level {currentLevel}
          </Badge>
          <Badge colorScheme="green" fontSize="lg">
            {userXp} XP
          </Badge>
        </HStack>
      </VStack>

      <VStack spacing={8} align="stretch">
        {levels.map((level) => {
          const isUnlocked = true;

          return (
            <MotionCard
              key={level.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              bg="white"
              borderRadius="2xl"
              boxShadow="xl"
              border="2px solid"
              borderColor="green.200"
              cursor="pointer"
              onClick={() => handleLevelClick(level.id)}
              _hover={{ transform: "translateY(-4px)", shadow: "2xl" }}
            >
              <CardBody p={6}>
                <VStack align="start" spacing={6}>
                  <HStack justify="space-between" w="full">
                    <VStack align="start" spacing={2}>
                      <Heading size="md" color="green.600">
                        {level.title}
                      </Heading>
                      <Text color="gray.600">{level.description}</Text>
                    </VStack>
                    <Badge
                      colorScheme="green"
                      fontSize="md"
                      px={3}
                      py={1}
                      borderRadius="full"
                    >
                      <Icon as={FaUnlock} mr={1} />
                      Unlocked
                    </Badge>
                  </HStack>

                  <SimpleGrid
                    columns={{ base: 1, md: 2, lg: 3 }}
                    spacing={4}
                    w="full"
                  >
                    {level.workouts.map((workout) => (
                      <Card
                        key={workout.id}
                        bg="gray.50"
                        borderRadius="xl"
                        border="1px solid"
                        borderColor="gray.200"
                      >
                        <CardBody>
                          <VStack spacing={3} align="start">
                            <HStack>
                              <Icon as={FaDumbbell} color="blue.500" />
                              <Heading size="sm">{workout.title}</Heading>
                            </HStack>
                            <Text fontSize="sm" color="gray.600" noOfLines={2}>
                              {workout.description}
                            </Text>
                            <HStack justify="space-between" w="full">
                              <Badge
                                colorScheme={
                                  workout.difficulty === "easy"
                                    ? "green"
                                    : workout.difficulty === "medium"
                                      ? "orange"
                                      : "red"
                                }
                              >
                                {workout.difficulty}
                              </Badge>
                              <Badge colorScheme="blue">
                                {workout.duration}s
                              </Badge>
                            </HStack>
                            <Text fontSize="xs" color="gray.500">
                              {workout.category}
                            </Text>
                          </VStack>
                        </CardBody>
                      </Card>
                    ))}
                  </SimpleGrid>
                </VStack>
              </CardBody>
            </MotionCard>
          );
        })}
      </VStack>
    </Box>
  );
};

export default CategoriesSection;
