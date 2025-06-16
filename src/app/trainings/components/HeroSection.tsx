"use client";

import { Box, Heading, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

const HeroSection: React.FC = () => (
  <MotionBox
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    textAlign="center"
    mb={16}
    mt={12}
  >
    <Heading
      as="h1"
      size="2xl"
      mb={4}
      h={100}
      bgGradient="linear(to-r, blue.400, blue.600)"
      bgClip="text"
    >
      Your Training Journey
    </Heading>
    <Text fontSize="lg" color="gray.600" maxW="2xl" mx="auto">
      Follow your personalized training plan and reach new heights. Every
      workout brings you closer to your goal!
    </Text>
  </MotionBox>
);

export default HeroSection;
