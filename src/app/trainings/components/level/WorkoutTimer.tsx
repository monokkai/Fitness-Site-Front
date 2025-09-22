"use client";

import { Text, Box } from "@chakra-ui/react";
import { formatTime } from "../../utils/timeFormatter";

interface WorkoutTimerProps {
  timeLeft: number;
}

export const WorkoutTimer: React.FC<WorkoutTimerProps> = ({ timeLeft }) => (
  <Box textAlign="center" py={4}>
    <Text fontSize="6xl" fontWeight="bold" color="blue.600">
      {formatTime(timeLeft)}
    </Text>
    <Text color="gray.600">Time remaining</Text>
  </Box>
);
