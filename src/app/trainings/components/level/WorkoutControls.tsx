"use client";

import { VStack, Button } from "@chakra-ui/react";
import { FaPlay, FaPause, FaCheck } from "react-icons/fa";

interface WorkoutControlsProps {
  isActive: boolean;
  onStart: () => void;
  onPause: () => void;
  onComplete: () => void;
  disabled?: boolean;
}

export const WorkoutControls: React.FC<WorkoutControlsProps> = ({
  isActive,
  onStart,
  onPause,
  onComplete,
  disabled,
}) => (
  <VStack spacing={4}>
    {!isActive ? (
      <Button
        leftIcon={<FaPlay />}
        colorScheme="green"
        size="lg"
        w="full"
        onClick={onStart}
        isDisabled={disabled}
      >
        Start Workout
      </Button>
    ) : (
      <Button
        leftIcon={<FaPause />}
        colorScheme="orange"
        size="lg"
        w="full"
        onClick={onPause}
      >
        Pause
      </Button>
    )}

    <Button
      leftIcon={<FaCheck />}
      colorScheme="blue"
      variant="outline"
      w="full"
      onClick={onComplete}
      isDisabled={disabled}
    >
      Complete Workout
    </Button>
  </VStack>
);
