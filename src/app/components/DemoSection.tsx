"use client";

import {
  Box,
  Flex,
  Heading,
  Text,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";

export default function PowerfulFeatures() {
  const bg = useColorModeValue("gray.50", "gray.900");
  const textColor = useColorModeValue("gray.800", "gray.100");
  const borderColor = useColorModeValue("gray.200", "gray.700");

  return (
    <Box
      id="features-section"
      bg={bg}
      py={{ base: 16, md: 24 }}
      px={{ base: 6, md: 12 }}
    >
      <Heading
        as="h5"
        size="sm"
        mb={6}
        color="gray.500"
        fontWeight="extrabold"
        textAlign="center"
      >
        INNOVATIVE FITNESS FEATURES
      </Heading>

      <Flex
        direction={{ base: "column", md: "row" }}
        align="center"
        justify="space-between"
        gap={{ base: 12, md: 20 }}
        maxW="7xl"
        mx="auto"
        mb={{ base: 16, md: 24 }}
      >
        <Box
          flex="1"
          maxW={{ base: "100%", md: "600px" }}
          rounded="2xl"
          overflow="hidden"
          border="1px solid"
          borderColor={borderColor}
          boxShadow={useColorModeValue("xl", "dark-lg")}
          _hover={{
            boxShadow: useColorModeValue("2xl", "dark-2xl"),
            transition: "box-shadow 0.3s ease",
          }}
        >
          <video
            src="/demo-video.mp4"
            autoPlay
            muted
            loop
            playsInline
            style={{ width: "100%", height: "auto", display: "block" }}
            controls={false}
          />
        </Box>

        <Box flex="1" maxW={{ base: "100%", md: "480px" }} color={textColor}>
          <Heading
            as="h2"
            size="xl"
            mb={5}
            color="gray.700"
            fontWeight="extrabold"
          >
            Smart Fitness Analytics Dashboard
          </Heading>
          <Text fontSize="lg" mb={8} lineHeight="tall">
            Experience a revolutionary way to track your fitness journey with our 
            intelligent analytics dashboard. Monitor workouts, progress, and achievements 
            in real-time, making your fitness goals more achievable than ever.
          </Text>
          <Button
            size="lg"
            colorScheme="brand"
            _hover={{
              bg: "brand.400",
              boxShadow: useColorModeValue(
                "0 0 12px rgba(170, 255, 3, 0.7)",
                "0 0 12px rgba(170, 255, 3, 0.7)"
              ),
            }}
          >
            Start Training
          </Button>
        </Box>
      </Flex>

      <Flex
        direction={{ base: "column", md: "row-reverse" }}
        align="center"
        justify="space-between"
        gap={{ base: 12, md: 20 }}
        maxW="7xl"
        mx="auto"
      >
        <Box
          flex="1"
          maxW={{ base: "100%", md: "600px" }}
          rounded="2xl"
          overflow="hidden"
          border="1px solid"
          borderColor={borderColor}
          boxShadow={useColorModeValue("xl", "dark-lg")}
          _hover={{
            boxShadow: useColorModeValue("2xl", "dark-2xl"),
            transition: "box-shadow 0.3s ease",
          }}
        >
          <video
            src="/demo-video-2.mp4"
            autoPlay
            muted
            loop
            playsInline
            style={{ width: "100%", height: "auto", display: "block" }}
            controls={false}
          />
        </Box>

        <Box flex="1" maxW={{ base: "100%", md: "480px" }} color={textColor}>
          <Heading
            as="h2"
            size="xl"
            mb={5}
            color="gray.700"
            fontWeight="extrabold"
          >
            Comprehensive Workout Insights
          </Heading>
          <Text fontSize="lg" mb={8} lineHeight="tall">
            Gain deep insights into your training progress with an intuitive, 
            Apple Fitness-inspired interface. Track exercises, sets, and personal records 
            with ease, making your fitness journey more rewarding and effective.
          </Text>
          <Button
            size="lg"
            colorScheme="brand"
            _hover={{
              bg: "brand.400",
              boxShadow: useColorModeValue(
                "0 0 12px rgba(170, 255, 3, 0.7)",
                "0 0 12px rgba(170, 255, 3, 0.7)"
              ),
            }}
          >
            View Progress
          </Button>
        </Box>
      </Flex>
    </Box>
  );
}
