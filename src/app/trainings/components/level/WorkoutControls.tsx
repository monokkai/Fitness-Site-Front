"use client";

import { Button, HStack } from "@chakra-ui/react";
import { FaPlay, FaPause, FaStop } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const MotionBox = motion.create("div");

interface WorkoutControlsProps {
  selectedWorkout: number | null;
  isPlaying: boolean;
  onStart: () => void;
  onPause: () => void;
  onStop: () => void;
}

export default function WorkoutControls({ selectedWorkout, isPlaying, onStart, onPause, onStop }: WorkoutControlsProps) {
  return (
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
          </HStack>
        </MotionBox>
      )}
    </AnimatePresence>
  );
}