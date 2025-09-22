"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Box,
  Container,
  VStack,
  HStack,
  Card,
  CardBody,
  useToast,
  Text
} from "@chakra-ui/react";
import { useAuth } from "../../../shared/context/authContext";
import { useLevelData } from "../../hooks/useLevelData";
import { useWorkoutTimer } from "../../hooks/useWorkoutTimer";
import { useWorkoutCompletion } from "../../hooks/useWorkoutCompletion";
import { LevelHeader } from "../../components/level/LevelHeader";
import { LevelProgress } from "../../components/level/LevelProgress";
import { VideoPlayer } from "../../components/level/VideoPlayer";
import { WorkoutTimer } from "../../components/level/WorkoutTimer";
import { WorkoutControls } from "../../components/level/WorkoutControls";
import { WorkoutList } from "../../components/level/WorkoutList";
import { LoadingSpinner } from "../../"
import { ErrorAlert } from "../../components/common/ErrorAlert";

export default function LevelPage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const toast = useToast();
  const levelId = parseInt(params.levelId as string);

  const { levelData, loading, error } = useLevelData(levelId);
  const [currentWorkoutIndex, setCurrentWorkoutIndex] = useState(0);

  const { completedWorkouts, totalXP, completeWorkout } = useWorkoutCompletion(
    user?.id || 0
  );

  const currentWorkout = levelData?.workouts[currentWorkoutIndex];
  const initialTime = currentWorkout?.duration || 0;

  const { timeLeft, isActive, start, pause } = useWorkoutTimer(
    initialTime,
    handleWorkoutComplete
  );

  async function handleWorkoutComplete() {
    if (!currentWorkout) return;

    const success = await completeWorkout(
      currentWorkout.id,
      currentWorkout.duration - timeLeft
    );

    if (success) {
      if (currentWorkoutIndex < levelData!.workouts.length - 1) {
        setCurrentWorkoutIndex((prev) => prev + 1);
      } else {
        handleLevelComplete();
      }
    }
  }

  function handleLevelComplete() {
    toast({
      title: "Level Completed!",
      description: `Congratulations! You earned ${totalXP + 10} XP total`,
      status: "success",
      duration: 3000,
    });

    setTimeout(() => router.push(`/trainings/${levelId + 1}`), 2000);
  }

  if (loading) return <LoadingSpinner text={`Loading Level ${levelId}...`} />;
  if (error || !levelData)
    return <ErrorAlert message={error || "Level not found"} />;

  const progress = {
    completedWorkouts,
    totalXP,
    currentWorkoutIndex,
  };

  return (
    <Box minH="100vh" bg="gray.50" py={8}>
      <Container maxW="container.xl">
        <VStack spacing={8} align="stretch">
          <LevelHeader level={levelData} />
          <LevelProgress
            progress={progress}
            totalWorkouts={levelData.workouts.length}
          />

          <HStack spacing={8} align="start">
            <VideoPlayer />

            <Card bg="white" shadow="lg" flex={1}>
              <CardBody>
                <VStack spacing={6} align="stretch">
                  <VStack spacing={3} align="start">
                    <Text fontWeight="bold" fontSize="lg">
                      {currentWorkout?.title}
                    </Text>
                    <Text color="gray.600">{currentWorkout?.description}</Text>
                  </VStack>

                  <WorkoutTimer timeLeft={timeLeft} />
                  <WorkoutControls
                    isActive={isActive}
                    onStart={start}
                    onPause={pause}
                    onComplete={handleWorkoutComplete}
                    disabled={!currentWorkout}
                  />

                  <WorkoutList
                    workouts={levelData.workouts}
                    completedWorkouts={completedWorkouts}
                    currentWorkoutIndex={currentWorkoutIndex}
                  />
                </VStack>
              </CardBody>
            </Card>
          </HStack>
        </VStack>
      </Container>
    </Box>
  );
}
