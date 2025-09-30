"use client";

import {
  Box,
  Card,
  CardBody,
  Heading,
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
  SimpleGrid,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { FaUnlock, FaDumbbell, FaRedo, FaSignInAlt } from "react-icons/fa";
import { useAuth } from "../../shared/context/authContext";
import { useRouter } from "next/navigation";
import { API_URL, TRAINING_URL } from "@/app/shared/config/api.config";

const MotionCard = motion.create(Card);

interface Level {
  id: number;
  title: string;
  description: string;
  workoutCount: number;
  difficulty: string;
  xp: number;
}

const CategoriesSection: React.FC = () => {
  const { user, isLoading: authLoading } = useAuth();
  const router = useRouter();
  const [levels, setLevels] = useState<Level[]>([]);
  const [totalWorkouts, setTotalWorkouts] = useState(0);
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

  // Refresh data when returning to page
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden && user && !authLoading) {
        fetchUserData();
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [user, authLoading]);

  // Also refresh when component mounts after navigation
  useEffect(() => {
    if (user && !authLoading) {
      const timer = setTimeout(() => {
        fetchUserData();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, []);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("Authentication token not found");
      }

      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      const [workoutsResponse, userProfileResponse] = await Promise.all([
        fetch(`${TRAINING_URL}/workouts`, { headers }),
        fetch(`${TRAINING_URL}/user-profiles/${user.id}`, { headers }),
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

      setTotalWorkouts(workoutsData.length);
      const generatedLevels = generateLevels(workoutsData.length);
      setLevels(generatedLevels);
    } catch (error) {
      setError(error instanceof Error ? error.message : "Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  const generateLevels = (totalWorkouts: number): Level[] => {
    const workoutsPerLevel = 3;
    const levelCount = Math.ceil(totalWorkouts / workoutsPerLevel);

    return Array.from({ length: Math.max(levelCount, 5) }, (_, index) => {
      const level = index + 1;
      const difficulties = ["easy", "easy", "medium", "medium", "hard"];
      const xpValues = [50, 75, 100, 125, 150];

      return {
        id: level,
        title: `Level ${level}`,
        description: `Complete ${workoutsPerLevel} exercises to unlock next level`,
        workoutCount: workoutsPerLevel,
        difficulty: difficulties[index] || "medium",
        xp: xpValues[index] || 100,
      };
    });
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

      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
        {levels.map((level) => {
          const isUnlocked = level.id <= currentLevel;

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
              borderColor={isUnlocked ? "green.200" : "gray.200"}
              cursor={isUnlocked ? "pointer" : "not-allowed"}
              onClick={() => isUnlocked && handleLevelClick(level.id)}
              _hover={
                isUnlocked
                  ? { transform: "translateY(-4px)", shadow: "2xl" }
                  : {}
              }
              opacity={isUnlocked ? 1 : 0.6}
            >
              <CardBody p={6}>
                <VStack spacing={4} align="center">
                  <Box
                    w="80px"
                    h="80px"
                    borderRadius="full"
                    bg={isUnlocked ? "blue.500" : "gray.400"}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    color="white"
                    fontSize="2xl"
                    fontWeight="bold"
                  >
                    {level.id}
                  </Box>

                  <VStack spacing={2} align="center">
                    <Heading
                      size="md"
                      color={isUnlocked ? "blue.600" : "gray.500"}
                    >
                      {level.title}
                    </Heading>
                    <Text color="gray.600" textAlign="center" fontSize="sm">
                      {level.description}
                    </Text>
                  </VStack>

                  <HStack spacing={2}>
                    <Badge
                      colorScheme={
                        level.difficulty === "easy"
                          ? "green"
                          : level.difficulty === "medium"
                            ? "orange"
                            : "red"
                      }
                    >
                      {level.difficulty}
                    </Badge>
                    <Badge colorScheme="purple">{level.xp} XP</Badge>
                    <Badge colorScheme="blue">{level.workoutCount} 💪</Badge>
                  </HStack>

                  <Badge
                    colorScheme={isUnlocked ? "green" : "gray"}
                    fontSize="sm"
                    px={3}
                    py={1}
                    borderRadius="full"
                  >
                    <Icon as={isUnlocked ? FaUnlock : FaDumbbell} mr={1} />
                    {isUnlocked ? "Unlocked" : "Locked"}
                  </Badge>
                </VStack>
              </CardBody>
            </MotionCard>
          );
        })}
      </SimpleGrid>
    </Box>
  );
};

export default CategoriesSection;
