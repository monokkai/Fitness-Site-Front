import {
  Button,
  Flex,
  Text,
  Box,
  Image,
  useColorModeValue,
  Heading,
} from "@chakra-ui/react";
import React from "react";

const InovateSection: React.FC = () => {
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const textColor = useColorModeValue("gray.800", "gray.100");
  return (
    <Box>
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
          borderColor={borderColor}
        >
          <Image
            src="http://localhost:8081/photo/macbook.png"
            alt="MacBook with website"
            style={{ width: "100%", height: "auto", display: "block" }}
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
            Experience a revolutionary way to track your fitness journey with
            our intelligent analytics dashboard. Monitor workouts, progress, and
            achievements in real-time, making your fitness goals more achievable
            than ever.
          </Text>
          <Button
            size="lg"
            colorScheme="brand"
            borderRadius={30}
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
        direction={{ base: "column", md: "row" }}
        align="center"
        justify="space-between"
        gap={{ base: 12, md: 20 }}
        maxW="7xl"
        mx="auto"
        mb={{ base: 16, md: 24 }}
      >
        <Box flex="1" maxW={{ base: "100%", md: "480px" }} color={textColor}>
          <Heading
            as="h2"
            size="xl"
            mb={5}
            color="gray.700"
            fontWeight="extrabold"
          >
            Personalized Workout Plans
          </Heading>
          <Text fontSize="lg" mb={8} lineHeight="tall">
            Get customized workout routines tailored to your fitness level and
            goals. Our AI-powered system adapts to your progress, ensuring
            you&apos;re always challenged but never overwhelmed. Track your
            performance metrics and celebrate your achievements with our
            comprehensive progress tracking system.
          </Text>
          <Button
            size="lg"
            colorScheme="brand"
            borderRadius={30}
            _hover={{
              bg: "brand.400",
              boxShadow: useColorModeValue(
                "0 0 12px rgba(170, 255, 3, 0.7)",
                "0 0 12px rgba(170, 255, 3, 0.7)"
              ),
            }}
          >
            View Plans
          </Button>
        </Box>

        <Box
          flex="1"
          maxW={{ base: "100%", md: "600px" }}
          rounded="2xl"
          overflow="hidden"
          borderColor={borderColor}
          display={"flex"}
          justifyContent={"center"}
        >
          <Image
            src="http://localhost:8081/photo/iphone.png"
            alt="Workout plans interface"
            width={"40%"}
          />
        </Box>
      </Flex>
    </Box>
  );
};

export default InovateSection;
