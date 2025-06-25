"use client";

import { Box, Text, VStack, Badge, Tooltip, HStack } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { FaDumbbell, FaLock, FaCheck } from "react-icons/fa";

interface LevelNodeProps {
  level: number;
  isCompleted?: boolean;
  isLocked?: boolean;
  xp?: number;
  exerciseCount?: number;
  difficulty?: "easy" | "medium" | "hard";
}

const difficultyColors = {
  easy: "green",
  medium: "orange",
  hard: "red",
};

export const LevelNode = ({
  level,
  isCompleted = false,
  isLocked = false,
  xp = 100,
  exerciseCount = 5,
  difficulty = "medium",
}: LevelNodeProps) => {
  const nodeContent = (
    <VStack spacing={3}>
      <motion.div
        style={{
          width: "90px",
          height: "90px",
          borderRadius: "50%",
          backgroundColor: isLocked
            ? "#CBD5E0"
            : isCompleted
              ? "#48BB78"
              : "#4299E1",
          color: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: isLocked ? "not-allowed" : "pointer",
          boxShadow: isCompleted
            ? "0 0 20px rgba(72, 187, 120, 0.3)"
            : "0 0 20px rgba(66, 153, 225, 0.3)",
          border: isCompleted ? "3px solid #38A169" : "3px solid #3182CE",
          position: "relative",
          overflow: "visible",
        }}
        whileHover={
          !isLocked
            ? {
                scale: 1.1,
                boxShadow: isCompleted
                  ? "0 0 25px rgba(72, 187, 120, 0.5)"
                  : "0 0 25px rgba(66, 153, 225, 0.5)",
              }
            : {}
        }
        whileTap={!isLocked ? { scale: 0.95 } : {}}
        transition={{ type: "spring", stiffness: 300 }}
      >
        {isLocked ? (
          <FaLock size={32} />
        ) : (
          <VStack spacing={0}>
            <Text fontSize="2xl" fontWeight="bold">
              {level}
            </Text>
            <FaDumbbell size={16} />
          </VStack>
        )}
        {isCompleted && (
          <Box
            position="absolute"
            top="-2"
            right="-2"
            bg="green.500"
            borderRadius="full"
            p={1}
          >
            <FaCheck size={12} />
          </Box>
        )}
      </motion.div>
      <VStack spacing={1}>
        <Text
          fontSize="sm"
          color="gray.700"
          fontWeight="bold"
          textTransform="uppercase"
          letterSpacing="wide"
        >
          Level {level}
        </Text>
        {!isLocked && (
          <HStack spacing={2}>
            <Badge colorScheme={difficultyColors[difficulty]}>
              {difficulty}
            </Badge>
            <Badge colorScheme="purple">{xp} XP</Badge>
            <Badge colorScheme="blue">{exerciseCount} 💪</Badge>
          </HStack>
        )}
      </VStack>
    </VStack>
  );

  return isLocked ? (
    <Tooltip
      label="Complete previous levels to unlock"
      hasArrow
      placement="top"
    >
      {nodeContent}
    </Tooltip>
  ) : (
    nodeContent
  );
};
