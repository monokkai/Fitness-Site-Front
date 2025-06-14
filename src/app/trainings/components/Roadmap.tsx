'use client';

import { Box } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { LevelNode } from "../../trainings/components/LevelNode";
import { FaBook } from "react-icons/fa";

interface PathNode {
  type: 'level' | 'story' | 'chest';
  level?: number;
  isCompleted?: boolean;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 200
    }
  }
};

const nodes: PathNode[] = [
  { type: 'level', level: 1, isCompleted: true },
  { type: 'level', level: 2 },
  { type: 'level', level: 3 },
  { type: 'story' },
  { type: 'level', level: 4 },
  { type: 'chest' },
  { type: 'level', level: 5 },
  { type: 'level', level: 6 },
  { type: 'story' },
  { type: 'level', level: 7 }
];

const generatePath = (index: number): { x: string; y: number } => {
  const isAlternating = index % 2 === 1;
  const xPos = isAlternating ? '60%' : '40%';
  const yPos = index * 180;
  return { x: xPos, y: yPos };
};

export const Roadmap = () => {
  return (
    <Box 
      w="full" 
      py={10}
      position="relative"
      overflow="visible"
      minH="1800px"
    >
      <svg
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 0,
          overflow: 'visible'
        }}
      >
        <path
          d={`M 40% 60 
              L 40% 120
              C 40% 150, 60% 150, 60% 180
              L 60% 240
              C 60% 270, 40% 270, 40% 300
              L 40% 360
              C 40% 390, 60% 390, 60% 420
              L 60% 480
              C 60% 510, 40% 510, 40% 540
              L 40% 600
              C 40% 630, 60% 630, 60% 660
              L 60% 720`}
          stroke="#E2E8F0"
          strokeWidth="8"
          fill="none"
          strokeLinecap="round"
        />
      </svg>
      <motion.div
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          zIndex: 1
        }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {nodes.map((node, index) => {
          const position = generatePath(index);
          if (node.type === 'story') {
            return (
              <motion.div
                key={`story-${index}`}
                variants={itemVariants}
                style={{
                  position: 'absolute',
                  left: position.x,
                  top: position.y,
                  transform: 'translate(-50%, 0)'
                }}
              >
                <Box
                  w="80px"
                  h="80px"
                  borderRadius="full"
                  bg="gray.100"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  color="gray.600"
                >
                  <FaBook size={32} />
                </Box>
              </motion.div>
            );
          } else if (node.type === 'chest') {
            return (
              <motion.div
                key={`chest-${index}`}
                variants={itemVariants}
                style={{
                  position: 'absolute',
                  left: position.x,
                  top: position.y,
                  transform: 'translate(-50%, 0)'
                }}
              >
                <Box
                  w="80px"
                  h="80px"
                  borderRadius="full"
                  bg="yellow.100"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  color="yellow.600"
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
                position: 'absolute',
                left: position.x,
                top: position.y,
                transform: 'translate(-50%, 0)'
              }}
            >
              <LevelNode 
                level={node.level!} 
                isCompleted={node.isCompleted}
              />
            </motion.div>
          );
        })}
      </motion.div>
    </Box>
  );
}; 