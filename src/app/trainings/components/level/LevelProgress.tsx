"use client";

import {
  Card,
  CardBody,
  VStack,
  HStack,
  Text,
  Progress,
  Badge,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { ILevelProgress } from "../../interfaces/ILevel";

interface LevelProgressProps {
  progress: ILevelProgress;
  totalWorkouts: number;
}

export const LevelProgress: React.FC<LevelProgressProps> = ({
  progress,
  totalWorkouts,
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.2 }}
  >
    <Card bg="white" shadow="lg">
      <CardBody>
        <VStack spacing={4}>
          <HStack justify="space-between" w="full">
            <Text fontWeight="bold">Progress</Text>
            <Text>
              {progress.completedWorkouts.length} / {totalWorkouts} completed
            </Text>
          </HStack>
          <Progress
            value={(progress.completedWorkouts.length / totalWorkouts) * 100}
            colorScheme="green"
            size="lg"
            borderRadius="full"
          />
          <HStack justify="space-between" w="full">
            <Text color="gray.600">Total XP: {progress.totalXP}</Text>
            <Badge colorScheme="green">+10 XP per workout</Badge>
          </HStack>
        </VStack>
      </CardBody>
    </Card>
  </motion.div>
);
