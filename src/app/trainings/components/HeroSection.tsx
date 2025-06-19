"use client";

import { Box, Heading, Text, Container } from "@chakra-ui/react";
import { motion } from "framer-motion";
const MotionBox = motion(Box);

const HeroSection: React.FC = () => {
  return (
    <MotionBox
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] }}
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
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          textAlign="center"
        >
          <Heading
            as="h1"
            fontSize={{ base: "4xl", md: "5xl", lg: "6xl" }}
            fontWeight="extrabold"
            mb={6}
            bgGradient="linear(to-r, blue.400, purple.500, blue.600)"
            bgClip="text"
            bgSize="200% auto"
            sx={{
              "@keyframes gradient": {
                "0%": { backgroundPosition: "0% 50%" },
                "50%": { backgroundPosition: "100% 50%" },
                "100%": { backgroundPosition: "0% 50%" },
              },
              animation: "gradient 3s ease infinite",
            }}
            letterSpacing="tight"
            textShadow="0 2px 10px rgba(0,0,0,0.1)"
            transition="transform 0.3s ease"
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
            sx={{
              "&::after": {
                content: '""',
                display: "block",
                width: "100px",
                height: "4px",
                background: "linear-gradient(to right, #63B3ED, #9F7AEA)",
                margin: "2rem auto",
                borderRadius: "full",
                boxShadow: "0 2px 10px rgba(66, 153, 225, 0.3)",
                transform: "translateY(0)",
                transition: "transform 0.3s ease",
              },
              "&:hover::after": {
                transform: "translateY(-2px)",
              },
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
