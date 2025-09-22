"use client";

import { VStack, Heading, Text, Badge } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { ILevel } from "../../interfaces/ILevel";

interface LevelHeaderProps {
  level: ILevel;
}

export const LevelHeader: React.FC<LevelHeaderProps> = ({ level }) => (
  <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
    <VStack spacing={4} textAlign="center">
      <Badge colorScheme="blue" fontSize="lg" px={4} py={1}>
        Level {level.id}
      </Badge>
      <Heading size="2xl">{level.title}</Heading>
      <Text fontSize="xl" color="gray.600">
        {level.description}
      </Text>
    </VStack>
  </motion.div>
);
