"use client";

import { Center, VStack, Heading, Text, Badge, Button } from "@chakra-ui/react";
import { motion } from "framer-motion";

const MotionBox = motion.create("div");

interface CompletionScreenProps {
  earnedXP: number;
  onContinue: () => void;
}

export default function CompletionScreen({ earnedXP, onContinue }: CompletionScreenProps) {
  return (
    <Center minH="100vh" bg="white">
      <MotionBox
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <VStack spacing={8} textAlign="center">
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
          </VStack>
          <Button
            colorScheme="blue"
            size="lg"
            onClick={onContinue}
          >
            Continue Training
          </Button>
        </VStack>
      </MotionBox>
    </Center>
  );
}