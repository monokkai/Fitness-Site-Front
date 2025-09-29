"use client";

import { HStack, Button } from "@chakra-ui/react";
import { FaPlay, FaPause, FaStop } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const MotionHStack = motion(HStack);

interface WorkoutControlsProps {
  selectedWorkout: number | null;
  isPlaying: boolean;
  onStart: () => void;
  onPause: () => void;
  onStop: () => void;
}

export default function WorkoutControls({
  selectedWorkout,
  isPlaying,
  onStart,
  onPause,
  onStop,
}: WorkoutControlsProps) {
  return (
    <AnimatePresence>
      {selectedWorkout && (
        <MotionHStack
          spacing={4}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <Button
            colorScheme={isPlaying ? "orange" : "green"}
            size="lg"
            onClick={isPlaying ? onPause : onStart}
            leftIcon={isPlaying ? <FaPause /> : <FaPlay />}
          >
            {isPlaying ? "Pause" : "Start"}
          </Button>
          <Button
            colorScheme="red"
            size="lg"
            leftIcon={<FaStop />}
            onClick={onStop}
          >
            Stop
          </Button>
        </MotionHStack>
      )}
    </AnimatePresence>
  );
}