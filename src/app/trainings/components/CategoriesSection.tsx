"use client";

import {
  Box,
  Card,
  CardBody,
  Heading,
  Progress,
  SimpleGrid,
  Text,
  VStack,
  Button,
  Badge,
  HStack,
  useBreakpointValue,
  Center,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Spinner,
  Alert,
  AlertIcon,
  Icon,
  useToast,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import {
  FaPlay,
  FaPause,
  FaCheckCircle,
  FaLock,
  FaUnlock,
  FaDumbbell,
  FaRedo,
  FaSignInAlt,
} from "react-icons/fa";
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
  xp_reward: number;
  level_requirement: number;
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
  const [selectedWorkout, setSelectedWorkout] = useState<Workout | null>(null);
  const [workoutTime, setWorkoutTime] = useState(0);
  const [isWorkoutActive, setIsWorkoutActive] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const isMobile = useBreakpointValue({ base: true, md: false });

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

      const token =
        localStorage.getItem("session_token") ||
        document.cookie
          .split("; ")
          .find((row) => row.startsWith("session_token="))
          ?.split("=")[1];

      if (!token) {
        throw new Error("Authentication token not found");
      }

      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      const [workoutsResponse, userProfileResponse] = await Promise.all([
        fetch(`${API_URL}/workouts`, { headers }),
        fetch(`${API_URL}/api/users/profile`, {
          headers,
          credentials: "include",
        }),
      ]);

      if (!workoutsResponse.ok) {
        const errorText = await workoutsResponse.text();
        throw new Error(
          `Workouts API error: ${workoutsResponse.status} - ${errorText}`
        );
      }

      const workoutsData = await workoutsResponse.json();
      let userProfileData = { totalXP: 0, currentLevel: 1 };

      if (userProfileResponse.ok) {
        userProfileData = await userProfileResponse.json();
      }

      setUserXp(userProfileData.totalXP || 0);
      setCurrentLevel(userProfileData.currentLevel || 1);

      const groupedLevels = groupWorkoutsIntoLevels(
        workoutsData,
        userProfileData.currentLevel || 1
      );
      setLevels(groupedLevels);
    } catch (error) {
      console.error("Fetch error:", error);
      setError(
        error instanceof Error ? error.message : "Failed to load training data"
      );
    } finally {
      setLoading(false);
    }
  };

  const groupWorkoutsIntoLevels = (
    workouts: Workout[],
    userLevel: number
  ): Level[] => {
    const levelsMap = new Map<number, Workout[]>();

    workouts.forEach((workout) => {
      const level = workout.level_requirement || 1;
      if (!levelsMap.has(level)) {
        levelsMap.set(level, []);
      }
      levelsMap.get(level)!.push(workout);
    });

    return Array.from(levelsMap.entries())
      .map(([level, levelWorkouts]) => ({
        id: level,
        title: `Level ${level}`,
        description: getLevelDescription(level),
        workouts: levelWorkouts,
        required_xp: (level - 1) * 100,
        order: level,
      }))
      .sort((a, b) => a.order - b.order);
  };

  const getLevelDescription = (level: number): string => {
    const descriptions = [
      "Beginner exercises to start your journey",
      "Build fundamental strength and technique",
      "Intermediate challenges for progression",
      "Advanced workouts for mastery",
      "Expert level for peak performance",
    ];
    return descriptions[level - 1] || `Level ${level} training`;
  };

  const startWorkout = (workout: Workout) => {
    setSelectedWorkout(workout);
    setWorkoutTime(workout.duration);
    setIsWorkoutActive(false);
    onOpen();
  };

  const completeWorkout = async () => {
    if (!selectedWorkout || !user) return;

    try {
      const token =
        localStorage.getItem("authToken") ||
        document.cookie
          .split("; ")
          .find((row) => row.startsWith("token="))
          ?.split("=")[1];

      const response = await fetch(`${API_URL}/user-workouts`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user.id,
          workoutId: selectedWorkout.id,
          completionTime: selectedWorkout.duration - workoutTime,
          actualRepeats: 1,
          score: selectedWorkout.xp_reward,
        }),
      });

      if (response.ok) {
        setUserXp((prev) => prev + selectedWorkout.xp_reward);

        toast({
          title: "Workout Completed!",
          description: `+${selectedWorkout.xp_reward} XP earned`,
          status: "success",
          duration: 3000,
        });

        fetchUserData();
      }
    } catch (error) {
      console.error("Complete workout error:", error);
      toast({
        title: "Error",
        description: "Failed to save workout completion",
        status: "error",
        duration: 3000,
      });
    }

    onClose();
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isWorkoutActive && workoutTime > 0) {
      interval = setInterval(() => {
        setWorkoutTime((prev) => prev - 1);
      }, 1000);
    } else if (workoutTime === 0 && isWorkoutActive) {
      completeWorkout();
    }
    return () => clearInterval(interval);
  }, [isWorkoutActive, workoutTime]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  if (authLoading) {
    return (
      <Center minH="400px">
        <Spinner size="xl" color="blue.500" thickness="4px" />
      </Center>
    );
  }

  if (!user) {
    return (
      <Center minH="400px">
        <VStack spacing={6}>
          <Alert status="info" borderRadius="lg">
            <AlertIcon />
            <Text>Please login to access the training program</Text>
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
          <Spinner size="xl" color="blue.500" thickness="4px" />
          <Text color="gray.600">Loading training program...</Text>
        </VStack>
      </Center>
    );
  }

  if (error) {
    return (
      <Center minH="400px">
        <VStack spacing={4}>
          <Alert status="error" borderRadius="lg">
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
        <Heading size="lg">Training Program</Heading>
        <HStack spacing={4}>
          <Badge colorScheme="blue" fontSize="lg">
            Level {currentLevel}
          </Badge>
          <Badge colorScheme="green" fontSize="lg">
            {userXp} XP
          </Badge>
          <Badge colorScheme="purple" fontSize="lg">
            {user.username}
          </Badge>
        </HStack>
      </VStack>

      <VStack spacing={8} align="stretch">
        {levels.map((level) => {
          const isUnlocked = userXp >= level.required_xp;
          const progress =
            level.required_xp > 0
              ? Math.min((userXp / level.required_xp) * 100, 100)
              : 100;

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
            >
              <CardBody p={6}>
                <VStack align="start" spacing={6}>
                  <HStack justify="space-between" w="full">
                    <VStack align="start" spacing={2}>
                      <Heading
                        size="md"
                        color={isUnlocked ? "green.600" : "gray.600"}
                      >
                        {level.title}
                      </Heading>
                      <Text color="gray.600">{level.description}</Text>
                    </VStack>
                    <Badge
                      colorScheme={isUnlocked ? "green" : "gray"}
                      fontSize="md"
                      px={3}
                      py={1}
                      borderRadius="full"
                    >
                      <Icon as={isUnlocked ? FaUnlock : FaLock} mr={1} />
                      {isUnlocked
                        ? "Unlocked"
                        : `${level.required_xp} XP needed`}
                    </Badge>
                  </HStack>

                  {!isUnlocked && level.required_xp > 0 && (
                    <Box w="full">
                      <Text mb={2} fontSize="sm" color="gray.600">
                        Progress: {Math.round(progress)}% ({userXp}/
                        {level.required_xp} XP)
                      </Text>
                      <Progress
                        value={progress}
                        colorScheme="blue"
                        borderRadius="full"
                        height="10px"
                      />
                    </Box>
                  )}

                  {isUnlocked && (
                    <SimpleGrid
                      columns={{ base: 1, md: 2, lg: 3 }}
                      spacing={4}
                      w="full"
                    >
                      {level.workouts.map((workout) => (
                        <Card
                          key={workout.id}
                          cursor="pointer"
                          bg="gray.50"
                          borderRadius="xl"
                          border="1px solid"
                          borderColor="gray.200"
                          _hover={{
                            transform: "translateY(-2px)",
                            shadow: "md",
                            borderColor: "blue.300",
                          }}
                          transition="all 0.2s"
                          onClick={() => startWorkout(workout)}
                        >
                          <CardBody>
                            <VStack spacing={3} align="start">
                              <HStack>
                                <Icon as={FaDumbbell} color="blue.500" />
                                <Heading size="sm">{workout.title}</Heading>
                              </HStack>
                              <Text
                                fontSize="sm"
                                color="gray.600"
                                noOfLines={2}
                              >
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
                                <Badge colorScheme="green">
                                  {workout.xp_reward} XP
                                </Badge>
                              </HStack>
                              <Text fontSize="xs" color="gray.500">
                                {workout.duration}s • {workout.category}
                              </Text>
                            </VStack>
                          </CardBody>
                        </Card>
                      ))}
                    </SimpleGrid>
                  )}
                </VStack>
              </CardBody>
            </MotionCard>
          );
        })}
      </VStack>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size={isMobile ? "full" : "md"}
        isCentered
      >
        <ModalOverlay />
        <ModalContent borderRadius="2xl" mx={isMobile ? 0 : 4}>
          <ModalHeader borderBottom="1px solid" borderColor="gray.200">
            <Heading size="lg">{selectedWorkout?.title}</Heading>
            <ModalCloseButton />
          </ModalHeader>
          <ModalBody py={6}>
            <VStack spacing={6}>
              <Box textAlign="center" py={4}>
                <Text fontSize="4xl" fontWeight="bold" color="blue.600">
                  {formatTime(workoutTime)}
                </Text>
                <Text color="gray.600">Time remaining</Text>
              </Box>

              <Text color="gray.600" textAlign="center">
                {selectedWorkout?.description}
              </Text>

              <HStack spacing={3} w="full" justify="center">
                <Button
                  leftIcon={isWorkoutActive ? <FaPause /> : <FaPlay />}
                  colorScheme={isWorkoutActive ? "orange" : "green"}
                  onClick={() => setIsWorkoutActive(!isWorkoutActive)}
                  size="lg"
                  borderRadius="xl"
                  flex={1}
                >
                  {isWorkoutActive ? "Pause" : "Start"}
                </Button>

                <Button
                  leftIcon={<FaCheckCircle />}
                  colorScheme="purple"
                  onClick={completeWorkout}
                  size="lg"
                  borderRadius="xl"
                  flex={1}
                >
                  Complete
                </Button>
              </HStack>

              <HStack
                justify="space-between"
                w="full"
                pt={4}
                borderTop="1px solid"
                borderColor="gray.200"
              >
                <Badge
                  colorScheme={
                    selectedWorkout?.difficulty === "easy"
                      ? "green"
                      : selectedWorkout?.difficulty === "medium"
                        ? "orange"
                        : "red"
                  }
                  fontSize="sm"
                >
                  {selectedWorkout?.difficulty}
                </Badge>
                <Badge colorScheme="green" fontSize="sm">
                  {selectedWorkout?.xp_reward} XP Reward
                </Badge>
                <Badge colorScheme="blue" fontSize="sm">
                  {selectedWorkout?.duration}s
                </Badge>
              </HStack>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default CategoriesSection;
