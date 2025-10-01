"use client";

import {
  Box,
  Heading,
  VStack,
  Spinner,
  Center,
  Text,
  Badge,
  HStack,
  Button,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import { FaArrowLeft } from "react-icons/fa";
import { useParams, useRouter } from "next/navigation";
import { useLevelData } from "../hooks/useLevelData";
import { useState } from "react";
import VideoPlayer from "../components/level/VideoPlayer";
import WorkoutControls from "../components/level/WorkoutControls";
import WorkoutList from "../components/level/WorkoutList";
import CompletionScreen from "../components/level/CompletionScreen";
import { useWorkoutTimer } from "../hooks/useWorkoutTimer";

export default function TrainingLevelPage() {
  const params = useParams();
  const router = useRouter();
  const levelId = Number(params?.id);
  const { levelData, loading, error } = useLevelData(levelId);
  const [selectedWorkout, setSelectedWorkout] = useState<number | null>(null);

  const {
    currentWorkoutIndex,
    isPlaying,
    timeLeft,
    completedWorkouts,
    showCompletion,
    earnedXP,
    startWorkout,
    pauseWorkout,
    stopWorkout
  } = useWorkoutTimer({
    levelData,
    onComplete: () => {}
  });

  const handleStart = () => {
    if (!selectedWorkout && levelData?.workouts.length) {
      setSelectedWorkout(levelData.workouts[0].id);
    }
    startWorkout();
  };

  const handleStop = () => {
    stopWorkout();
    setSelectedWorkout(null);
  };

  const handleWorkoutSelect = (workoutId: number) => {
    if (!isPlaying) {
      setSelectedWorkout(workoutId);
    }
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
      <CompletionScreen
        earnedXP={earnedXP}
        onContinue={() => router.back()}
      />
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
          <Box flex={1} w="full">
            <VStack spacing={4}>
              <VideoPlayer
                selectedWorkoutId={selectedWorkout}
                isPlaying={isPlaying}
                timeLeft={timeLeft}
                currentWorkoutTitle={levelData.workouts.find(w => w.id === selectedWorkout)?.title}
                level={levelId}
              />
              
              <WorkoutControls
                selectedWorkout={selectedWorkout}
                isPlaying={isPlaying}
                onStart={handleStart}
                onPause={pauseWorkout}
                onStop={handleStop}
              />
            </VStack>
          </Box>

          <Box flex={1} w="full">
            <WorkoutList
              workouts={levelData.workouts}
              selectedWorkout={selectedWorkout}
              completedWorkouts={completedWorkouts}
              isPlaying={isPlaying}
              onWorkoutSelect={handleWorkoutSelect}
            />
          </Box>
        </HStack>
      </Box>
    </Box>
  );
}