import React from "react";
import {
  Box,
  Flex,
  Heading,
  Text,
  Button,
  Divider,
  useColorModeValue,
} from "@chakra-ui/react";
import Link from "next/link";

const PricingDemoSection: React.FC = () => {
  const textColor = useColorModeValue("gray.800", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  return (
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
                New subscribers get 1 month of HandFit+ free, then pay $9.99 per
                month or $29.99 annually.
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
                  Try HandFit One free
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
    </Box>
  );
};

export default PricingDemoSection;
