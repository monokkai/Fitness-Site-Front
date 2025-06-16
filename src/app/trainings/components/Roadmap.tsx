"use client";

import { Box, useBreakpointValue } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { LevelNode } from "./LevelNode";
import { FaBook } from "react-icons/fa";
import { PathNode } from "../interfaces/ITraining";
import { containerVariants, itemVariants } from "../utils/animations";
import { generatePath, generateSvgPath } from "../utils/utilities";

const nodes: PathNode[] = [
  {
    type: "level",
    level: 1,
    isCompleted: true,
    difficulty: "easy",
    xp: 50,
    exerciseCount: 3,
  },
  {
    type: "level",
    level: 2,
    isCompleted: true,
    difficulty: "easy",
    xp: 75,
    exerciseCount: 4,
  },
  { type: "level", level: 3, difficulty: "medium", xp: 100, exerciseCount: 5 },
  { type: "story", isLocked: false },
  {
    type: "level",
    level: 4,
    difficulty: "medium",
    xp: 100,
    exerciseCount: 5,
    isLocked: true,
  },
  { type: "chest", isLocked: true },
  {
    type: "level",
    level: 5,
    difficulty: "medium",
    xp: 125,
    exerciseCount: 6,
    isLocked: true,
  },
  {
    type: "level",
    level: 6,
    difficulty: "hard",
    xp: 150,
    exerciseCount: 6,
    isLocked: true,
  },
  { type: "story", isLocked: true },
  {
    type: "level",
    level: 7,
    difficulty: "hard",
    xp: 200,
    exerciseCount: 7,
    isLocked: true,
  },
];

const Roadmap: React.FC = () => {
  const isMobile = useBreakpointValue({ base: true, md: false }) ?? false;

  return (
    <Box
      w="full"
      py={10}
      position="relative"
      overflow="visible"
      minH={{ base: "2000px", md: "1800px" }}
    >
      <svg
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 0,
          overflow: "visible",
        }}
      >
        <path
          d={generateSvgPath(isMobile)}
          stroke="#E2E8F0"
          strokeWidth="8"
          fill="none"
          strokeLinecap="round"
          strokeDasharray={isMobile ? "5,15" : "none"}
        />
      </svg>
      <motion.div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          zIndex: 1,
        }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {nodes.map((node, index) => {
          const position = generatePath(index, isMobile);
          if (node.type === "story") {
            return (
              <motion.div
                key={`story-${index}`}
                variants={itemVariants}
                style={{
                  position: "absolute",
                  left: position.x,
                  top: position.y,
                  transform: "translate(-50%, 0)",
                }}
              >
                <Box
                  w="90px"
                  h="90px"
                  borderRadius="full"
                  bg={node.isLocked ? "gray.200" : "yellow.100"}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  color={node.isLocked ? "gray.400" : "yellow.600"}
                  cursor={node.isLocked ? "not-allowed" : "pointer"}
                  boxShadow={
                    node.isLocked ? "none" : "0 0 20px rgba(236, 201, 75, 0.3)"
                  }
                  border={
                    node.isLocked ? "3px solid #CBD5E0" : "3px solid #ECC94B"
                  }
                >
                  <FaBook size={32} />
                </Box>
              </motion.div>
            );
          } else if (node.type == "chest") {
            return (
              <motion.div
                key={`chest-${index}`}
                variants={itemVariants}
                style={{
                  position: "absolute",
                  left: position.x,
                  top: position.y,
                  transform: "translate(-50%, 0)",
                }}
              >
                <Box
                  w="90px"
                  h="90px"
                  borderRadius="full"
                  bg={node.isLocked ? "gray.200" : "purple.100"}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  color={node.isLocked ? "gray.400" : "purple.600"}
                  cursor={node.isLocked ? "not-allowed" : "pointer"}
                  boxShadow={
                    node.isLocked ? "none" : "0 0 20px rgba(159, 122, 234, 0.3)"
                  }
                  border={
                    node.isLocked ? "3px solid #CBD5E0" : "3px solid #805AD5"
                  }
                >
                  🎁
                </Box>
              </motion.div>
            );
          }
          return (
            <motion.div
              key={`level-${node.level}`}
              variants={itemVariants}
              style={{
                position: "absolute",
                left: position.x,
                top: position.y,
                transform: "translate(-50%, 0)",
              }}
            >
              <LevelNode
                level={node.level!}
                isCompleted={node.isCompleted}
                isLocked={node.isLocked}
                difficulty={node.difficulty}
                xp={node.xp}
                exerciseCount={node.exerciseCount}
              />
            </motion.div>
          );
        })}
      </motion.div>
    </Box>
  );
};

export default Roadmap;
