"use client";

import { Center, VStack, Heading, Text, Badge, Button, Icon } from "@chakra-ui/react";
import { FaTrophy } from "react-icons/fa";
import { motion } from "framer-motion";

const MotionVStack = motion(VStack);

interface CompletionModalProps {
  earnedXP: number;
  totalTime: number;
  onContinue: () => void;
}

export default function CompletionModal({ earnedXP, totalTime, onContinue }: CompletionModalProps) {
  const minutes = Math.floor(totalTime / 60);
  const seconds = totalTime % 60;

  return (
    <Center minH="100vh" bg="white">
      <MotionVStack
        spacing={8}
        textAlign="center"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Icon as={FaTrophy} boxSize={20} color="yellow.400" />
        <Heading size="2xl" color="green.500">
          🎉 Level Complete!
        </Heading>
        <VStack spacing={4}>
          <Text fontSize="xl" color="gray.600">
            You earned
          </Text>
          <Badge colorScheme="yellow" fontSize="3xl" p={4} borderRadius="xl">
            +{earnedXP} XP
          </Badge>
          <Text fontSize="md" color="gray.500">
            Total time: {minutes}:{seconds.toString().padStart(2, '0')}
          </Text>
        </VStack>
        <Button
          colorScheme="blue"
          size="lg"
          onClick={onContinue}
        >
          Continue Training
        </Button>
      </MotionVStack>
    </Center>
  );
}