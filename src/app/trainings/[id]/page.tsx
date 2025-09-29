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
import { useWorkoutTimer } from "../hooks/useWorkoutTimer";
import { useWorkoutCompletion } from "../hooks/useWorkoutCompletion";
import { useState } from "react";
import { useAuth } from "../../shared/context/authContext";

import VideoPlayer from "../components/level/VideoPlayer";
import WorkoutTimer from "../components/level/WorkoutTimer";
import WorkoutControls from "../components/level/WorkoutControls";
import CompletionModal from "../components/level/CompletionModal";
import WorkoutList from "../components/level/WorkoutList";

export default function TrainingLevelPage() {
  const params = useParams();
  const router = useRouter();
  const levelId = Number(params?.id);
  const { levelData, loading, error } = useLevelData(levelId);
  const [selectedWorkout, setSelectedWorkout] = useState<number | null>(null);
  const { user } = useAuth();

  const {
    completedWorkouts,
    currentWorkoutIndex,
    showCompletion,
    earnedXP,
    completeWorkout,
    resetProgress,
  } = useWorkoutCompletion({ levelId, levelData });

  const {
    timeLeft,
    isPlaying,
    totalTime,
    start,
    pause,
    stop,
    reset,
  } = useWorkoutTimer({
    onComplete: () => completeWorkout(totalTime),
    initialTime: 60,
  });

  const handleStart = () => {
    if (!selectedWorkout && levelData?.workouts?.length) {
      setSelectedWorkout(levelData.workouts[0].id);
    }
    start();
  };

  const handleStop = () => {
    stop();
    setSelectedWorkout(null);
    resetProgress();
  };

  const handleWorkoutSelect = (workoutId: number) => {
    if (!isPlaying) {
      setSelectedWorkout(workoutId);
      reset();
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
      <CompletionModal
        earnedXP={earnedXP}
        totalTime={totalTime}
        onContinue={() => router.push('/trainings')}
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
            <VStack spacing={6}>
              <VideoPlayer
                selectedWorkout={selectedWorkout}
                isPlaying={isPlaying}
                currentWorkoutIndex={currentWorkoutIndex}
                totalWorkouts={levelData.workouts?.length || 0}
                workoutTitle={levelData.workouts?.find?.(w => w.id === selectedWorkout)?.title}
              />

              <WorkoutControls
                selectedWorkout={selectedWorkout}
                isPlaying={isPlaying}
                onStart={handleStart}
                onPause={pause}
                onStop={handleStop}
              />

              <WorkoutTimer
                timeLeft={timeLeft}
                isPlaying={isPlaying}
                selectedWorkout={selectedWorkout}
              />
            </VStack>
          </Box>

          <Box flex={1} w="full">
            <WorkoutList
              workouts={levelData.workouts || []}
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