"use client";

import {
  Box,
  Flex,
  Heading,
  Text,
  Button,
  useColorModeValue,
  Divider,
  Image,
} from "@chakra-ui/react";
import Link from "next/link";
import FAQSection from "./FAQSection";

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

      <Box mt={24} maxW="7xl" mx="auto" textAlign="center">
        <Heading
          as="h2"
          size="xl"
          mb={12}
          color="gray.700"
          fontWeight="extrabold"
        >
          Unlock Your Full Potential
        </Heading>
        <Box
          p={20}
          bg={"gray.100"}
          w={"100vw"}
          ml={"calc(50% - 50vw)"}
          mr={"calc(50% - 50vw)"}
        >
          <Flex
            direction={{ base: "column", md: "row" }}
            justify="center"
            align="stretch"
            gap={8}
          >
            <Box
              p={8}
              rounded="3xl"
              borderColor={borderColor}
              flex="1"
              maxW={{ base: "100%", md: "380px" }}
              display="flex"
              flexDirection="column"
              justifyContent="space-between"
            >
              <Box>
                <Heading as="h3" size="md" mb={4} color={textColor}>
                  3 months free
                </Heading>
                <Divider borderColor="gray.300" mb={4} />
                <Text fontSize="md" mb={6} color={textColor}>
                  New subscribers get 3 months of HandFit+ free with the first
                  purchase.
                </Text>
              </Box>
              <Link href="/pricing" passHref>
                <Button
                  size="md"
                  colorScheme="green"
                  bg="brand.400"
                  borderRadius={30}
                  _hover={{ bg: "brand.600" }}
                >
                  Shop now
                </Button>
              </Link>
            </Box>
            <Box
              p={8}
              rounded="3xl"
              borderColor={borderColor}
              flex="1"
              maxW={{ base: "100%", md: "380px" }}
              display="flex"
              flexDirection="column"
              justifyContent="space-between"
            >
              <Box>
                <Heading as="h3" size="md" mb={4} color={textColor}>
                  1 month free
                </Heading>
                <Divider borderColor="gray.300" mb={4} />
                <Text fontSize="md" mb={6} color={textColor}>
                  New subscribers get 1 month of HandFit+ free, then pay $9.99
                  per month or $29.99 annually.
                </Text>
              </Box>
              <Link href="/pricing" passHref>
                <Button
                  size="md"
                  colorScheme="green"
                  bg="brand.400"
                  borderRadius={30}
                  _hover={{ bg: "brand.600" }}
                >
                  Try it free
                </Button>
              </Link>
            </Box>
            <Box
              p={8}
              rounded="3xl"
              borderColor={borderColor}
              flex="1"
              maxW={{ base: "100%", md: "380px" }}
              display="flex"
              flexDirection="column"
              justifyContent="space-between"
            >
              <Box>
                <Heading as="h3" size="md" mb={4} color={textColor}>
                  HandFit One
                </Heading>
                <Divider borderColor="gray.300" mb={4} />
                <Text fontSize="md" mb={6} color={textColor}>
                  Bundle HandFit+ with five other great services for one low
                  monthly price.
                </Text>
              </Box>
              <Flex direction="column" gap={2}>
                <Link href="/pricing" passHref>
                  <Button
                    size="md"
                    colorScheme="green"
                    variant="outline"
                    borderColor="brand.500"
                    color="brand.500"
                    borderRadius={30}
                    _hover={{ bg: "brand.500", color: "white" }}
                  >
                    Try Apple One free
                  </Button>
                </Link>
                <Link href="/pricing" passHref>
                  <Button size="md" variant="link" color={textColor}>
                    Learn more
                  </Button>
                </Link>
              </Flex>
            </Box>
          </Flex>
        </Box>

        <FAQSection/>
      </Box>
    </Box>
  );
}
