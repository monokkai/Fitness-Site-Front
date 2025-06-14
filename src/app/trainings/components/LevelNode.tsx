'use client';

import { Text, VStack } from "@chakra-ui/react";
import { motion } from "framer-motion";

interface LevelNodeProps {
  level: number;
  isCompleted?: boolean;
}

export const LevelNode = ({ level, isCompleted = false }: LevelNodeProps) => {
  return (
    <VStack spacing={3}>
      <motion.div
        style={{
          width: "80px",
          height: "80px",
          borderRadius: "50%",
          backgroundColor: isCompleted ? "#48BB78" : "#4299E1",
          color: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          boxShadow: isCompleted 
            ? "0 0 20px rgba(72, 187, 120, 0.3)" 
            : "0 0 20px rgba(66, 153, 225, 0.3)",
          border: isCompleted 
            ? "3px solid #38A169"
            : "3px solid #3182CE"
        }}
        whileHover={{ 
          scale: 1.1,
          boxShadow: isCompleted 
            ? "0 0 25px rgba(72, 187, 120, 0.5)"
            : "0 0 25px rgba(66, 153, 225, 0.5)"
        }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <Text fontSize="2xl" fontWeight="bold">
          {level}
        </Text>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <Text 
          fontSize="sm" 
          color="gray.600" 
          fontWeight="bold"
          textTransform="uppercase"
          letterSpacing="wide"
        >
          Level {level}
        </Text>
      </motion.div>
    </VStack>
  );
}; 