"use client";

import { Box, Text, VStack } from "@chakra-ui/react";
import { getVideoUrl } from "../../../shared/utils/videoUtils";

interface VideoPlayerProps {
  selectedWorkoutId: number | null;
  isPlaying: boolean;
  timeLeft: number;
  currentWorkoutTitle?: string;
  level: number;
}

export default function VideoPlayer({
  selectedWorkoutId,
  isPlaying,
  timeLeft,
  currentWorkoutTitle,
  level,
}: VideoPlayerProps) {
  const videoUrl = selectedWorkoutId ? getVideoUrl(level, selectedWorkoutId) : null;
  console.log('Video URL:', videoUrl, 'Level:', level, 'WorkoutId:', selectedWorkoutId);
  
  return (
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
      >
        {selectedWorkoutId ? (
          <video
            width="100%"
            height="100%"
            controls
            style={{ borderRadius: "12px" }}
            src={videoUrl!}
          >
            Your browser does not support the video tag.
          </video>
        ) : (
          <Text>Select a workout to view video</Text>
        )}
      </Box>

      {selectedWorkoutId && isPlaying && (
        <Box textAlign="center">
          <Text fontSize="3xl" fontWeight="bold" color="blue.600">
            {Math.floor(timeLeft / 60)}:
            {(timeLeft % 60).toString().padStart(2, "0")}
          </Text>
          <Text fontSize="lg" color="gray.600">
            {currentWorkoutTitle}
          </Text>
        </Box>
      )}
    </VStack>
  );
}
