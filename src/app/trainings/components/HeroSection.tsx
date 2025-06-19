"use client";

import { Box, Heading, Text, Container } from "@chakra-ui/react";
import { motion, useReducedMotion } from "framer-motion";
const MotionBox = motion(Box);

const HeroSection: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <MotionBox
      initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      position="relative"
      py={16}
      overflow="hidden"
    >
      <Box
        position="absolute"
        top="-20%"
        left="-10%"
        width="120%"
        height="140%"
        transform="rotate(-3deg)"
        zIndex={0}
        filter="blur(60px)"
      />

      <Container maxW="container.xl" position="relative" zIndex={1}>
        <MotionBox
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          textAlign="center"
        >
          <Heading
            as="h1"
            fontSize={{ base: "4xl", md: "5xl", lg: "6xl" }}
            fontWeight="extrabold"
            mb={6}
            bgGradient="linear(to-r, blue.400, purple.500, blue.600)"
            bgClip="text"
            letterSpacing="tight"
            textShadow="0 2px 10px rgba(0,0,0,0.1)"
            transition="transform 0.2s ease"
            _hover={{
              transform: "scale(1.01)",
            }}
          >
            Your Training Journey
          </Heading>
          <Text
            fontSize={{ base: "lg", md: "xl" }}
            color="gray.700"
            maxW="2xl"
            mx="auto"
            lineHeight="tall"
            fontWeight="medium"
            px={4}
            textShadow="0 1px 2px rgba(0,0,0,0.1)"
            position="relative"
            _after={{
              content: '""',
              display: "block",
              width: "100px",
              height: "4px",
              background: "linear-gradient(to right, #63B3ED, #9F7AEA)",
              margin: "2rem auto",
              borderRadius: "full",
              boxShadow: "0 2px 10px rgba(66, 153, 225, 0.3)",
            }}
          >
            Follow your personalized training plan and reach new heights. Every
            workout brings you closer to your goal!
          </Text>
        </MotionBox>
      </Container>
    </MotionBox>
  );
};

export default HeroSection;
