"use client";

import {
  Box,
  Heading,
  VStack,
  Spinner,
  Center,
  Text,
  Badge,
  Card,
  CardBody,
  HStack,
  Icon,
  Button,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import { FaDumbbell, FaArrowLeft, FaPlay, FaPause, FaStop } from "react-icons/fa";
import { useParams, useRouter } from "next/navigation";
import { useLevelData } from "../hooks/useLevelData";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import { useAuth } from "../../shared/context/authContext";
import { API_URL } from "@/app/shared/config/api.config";

const MotionBox = motion.create(Box);
const MotionCard = motion.create(Card);

export default function TrainingLevelPage() {
  const params = useParams();
  const router = useRouter();
  const levelId = Number(params?.id);
  const { levelData, loading, error } = useLevelData(levelId);
  const [selectedWorkout, setSelectedWorkout] = useState<number | null>(null);
  const [currentWorkoutIndex, setCurrentWorkoutIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [completedWorkouts, setCompletedWorkouts] = useState<number[]>([]);
  const [showCompletion, setShowCompletion] = useState(false);
  const [earnedXP, setEarnedXP] = useState(0);
  const { user } = useAuth();

  const completeWorkout = useCallback(async (workoutId: number) => {
    if (!user) return;
    
    try {
      const token = localStorage.getItem("token");
      await fetch(`${API_URL}/user-workouts`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          userId: user.id,
          workoutId,
          completionTime: 60,
          actualRepeats: 1,
          score: 100
        })
      });
    } catch (error) {
      console.error("Failed to save workout completion:", error);
    }
  }, [user]);

  const updateUserXP = useCallback(async (xpGained: number) => {
    if (!user) return;
    
    try {
      const token = localStorage.getItem("token");
      await fetch(`${API_URL}/api/users/profile`, {
        method: "PATCH",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          totalXP: xpGained
        })
      });
    } catch (error) {
      console.error("Failed to update XP:", error);
    }
  }, [user]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isPlaying && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isPlaying) {
      const currentWorkout = levelData?.workouts[currentWorkoutIndex];
      if (currentWorkout) {
        completeWorkout(currentWorkout.id);
        setCompletedWorkouts(prev => [...prev, currentWorkout.id]);
        
        if (currentWorkoutIndex < (levelData?.workouts.length || 0) - 1) {
          setCurrentWorkoutIndex(prev => prev + 1);
          setSelectedWorkout(levelData?.workouts[currentWorkoutIndex + 1]?.id || null);
          setTimeLeft(60);
        } else {
          const totalXP = (levelData?.workouts.length || 0) * 50;
          setEarnedXP(totalXP);
          updateUserXP(totalXP);
          setIsPlaying(false);
          setShowCompletion(true);
        }
      }
    }
    
    return () => clearInterval(interval);
  }, [isPlaying, timeLeft, currentWorkoutIndex, levelData, completeWorkout, updateUserXP]);

  const startWorkout = () => {
    if (!selectedWorkout && levelData?.workouts.length) {
      setSelectedWorkout(levelData.workouts[0].id);
      setCurrentWorkoutIndex(0);
    }
    setTimeLeft(60);
    setIsPlaying(true);
  };

  const stopWorkout = () => {
    setIsPlaying(false);
    setTimeLeft(60);
    setCurrentWorkoutIndex(0);
    setSelectedWorkout(null);
    setCompletedWorkouts([]);
  };

  if (loading) {
    return (
      <Center minH="400px">
        <VStack spacing={4}>
          <Spinner size="xl" color="blue.500" />
          <Text color="gray.600">Loading level data...</Text>
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
            leftIcon={<FaArrowLeft />}
            onClick={() => router.back()}
            colorScheme="blue"
          >
            Back to Trainings
          </Button>
        </VStack>
      </Center>
    );
  }

  if (!levelData) {
    return (
      <Center minH="400px">
        <Text>Level not found</Text>
      </Center>
    );
  }

  if (showCompletion) {
    return (
      <Center minH="100vh" bg="white">
        <MotionBox
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <VStack spacing={8} textAlign="center">
            <Heading size="2xl" color="green.500">
              🎉 Level Complete!
            </Heading>
            <VStack spacing={4}>
              <Text fontSize="xl" color="gray.600">
                You earned
              </Text>
              <Badge colorScheme="yellow" fontSize="3xl" p={4} borderRadius="xl">
                +{earnedXP} XP
              </Badge>
            </VStack>
            <Button
              colorScheme="blue"
              size="lg"
              onClick={() => router.back()}
            >
              Continue Training
            </Button>
          </VStack>
        </MotionBox>
      </Center>
    );
  }

  return (
    <Box minH="100vh" bg="gray.50">
      <Box maxW="container.xl" mx="auto" p={6}>
        <HStack mb={6}>
          <Button
            leftIcon={<FaArrowLeft />}
            variant="ghost"
            onClick={() => router.back()}
          >
            Back
          </Button>
        </HStack>

        <VStack spacing={6} align="start" mb={8}>
          <Heading size="xl" color="blue.600">
            {levelData.title}
          </Heading>
          <Text color="gray.600" fontSize="lg">
            {levelData.description}
          </Text>
          <Badge colorScheme="purple" fontSize="md" px={3} py={1}>
            {levelData.required_xp} XP Required
          </Badge>
        </VStack>

        <HStack spacing={{ base: 4, lg: 8 }} align="start" flexDir={{ base: "column", lg: "row" }}>
          {/* Video Player - Left Side */}
          <Box flex={1} w="full">
            <VStack spacing={4}>
              <Box
                w={{ base: "100%", lg: "700px" }}
                h={{ base: "250px", lg: "400px" }}
                maxW="700px"
                bg="black"
                borderRadius="xl"
                display="flex"
                alignItems="center"
                justifyContent="center"
                color="white"
                fontSize="lg"
                position="relative"
              >
                <VStack spacing={4}>
                  {selectedWorkout && isPlaying ? (
                    <>
                      <Text fontSize="2xl" fontWeight="bold">
                        {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
                      </Text>
                      <Text>
                        {levelData.workouts.find(w => w.id === selectedWorkout)?.title}
                      </Text>
                    </>
                  ) : (
                    <Text>Video Player</Text>
                  )}
                </VStack>
              </Box>
              
              <AnimatePresence>
                {selectedWorkout && (
                  <MotionBox
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <HStack spacing={4}>
                      <Button
                        colorScheme={isPlaying ? "orange" : "green"}
                        size="lg"
                        onClick={isPlaying ? () => setIsPlaying(false) : startWorkout}
                        leftIcon={isPlaying ? <FaPause /> : <FaPlay />}
                      >
                        {isPlaying ? "Pause" : "Start"}
                      </Button>
                      <Button
                        colorScheme="red"
                        size="lg"
                        leftIcon={<FaStop />}
                        onClick={stopWorkout}
                      >
                        Stop
                      </Button>
                    </HStack>
                  </MotionBox>
                )}
              </AnimatePresence>
            </VStack>
          </Box>

          {/* Workouts List - Right Side */}
          <Box flex={1} w="full">
            <VStack spacing={4} align="stretch">
              <Heading size="md" color="gray.700">
                Workouts ({levelData.workouts.length})
              </Heading>
              {levelData.workouts.length === 0 ? (
                <Alert status="info">
                  <AlertIcon />
                  <Text>No workouts available for this level yet.</Text>
                </Alert>
              ) : (
                levelData.workouts.map((workout, index) => {
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
                    onClick={() => !isPlaying && setSelectedWorkout(workout.id)}
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
          </Box>
        </HStack>
      </Box>
    </Box>
  );
}