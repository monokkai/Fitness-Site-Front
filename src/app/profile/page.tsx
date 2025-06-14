"use client";

import {
  Box,
  Container,
  VStack,
  HStack,
  Heading,
  Text,
  Card,
  CardBody,
  Stack,
  Stat,
  StatLabel,
  StatNumber,
  Progress,
  Badge,
  Avatar,
  SimpleGrid,
  Button,
} from "@chakra-ui/react";
import { FaFire, FaMedal, FaDumbbell, FaTrophy } from "react-icons/fa";
import LayoutWrapper from "./components/LayoutWrapper";

const ProfilePage: React.FC = () => {
  const stats = [
    { label: "Current Streak", value: "7", icon: FaFire, color: "orange" },
    { label: "Total XP", value: "1,250", icon: FaTrophy, color: "yellow" },
    { label: "Exercises Done", value: "45", icon: FaDumbbell, color: "blue" },
    { label: "Achievements", value: "12", icon: FaMedal, color: "purple" },
  ];

  return (
    <LayoutWrapper>
      <Box minH="100vh" bg="gray.50" pt={20}>
        <Container maxW="container.xl">
          <VStack spacing={8} align="stretch">
            <Card>
              <CardBody>
                <Stack
                  direction={{ base: "column", md: "row" }}
                  spacing={8}
                  align="center"
                >
                  <Avatar
                    size="2xl"
                    name="John Doe"
                    src="https://bit.ly/broken-link"
                  />
                  <Box flex={1}>
                    <Heading size="lg" mb={2}>
                      John Doe
                    </Heading>
                    <Text color="gray.600" mb={4}>
                      Joined January 2024
                    </Text>
                    <Badge colorScheme="blue" fontSize="md" p={2}>
                      Goal: Build Muscle
                    </Badge>
                  </Box>
                </Stack>
              </CardBody>
            </Card>

            <SimpleGrid columns={{ base: 1, md: 4 }} spacing={4}>
              {stats.map((stat, index) => (
                <Card key={index}>
                  <CardBody>
                    <Stat>
                      <HStack spacing={4}>
                        <Box
                          p={2}
                          bg={`${stat.color}.100`}
                          color={`${stat.color}.500`}
                          borderRadius="lg"
                        >
                          <stat.icon size={24} />
                        </Box>
                        <Box>
                          <StatLabel>{stat.label}</StatLabel>
                          <StatNumber>{stat.value}</StatNumber>
                        </Box>
                      </HStack>
                    </Stat>
                  </CardBody>
                </Card>
              ))}
            </SimpleGrid>

            <Card>
              <CardBody>
                <Heading size="md" mb={6}>
                  Current Progress
                </Heading>
                <VStack spacing={6} align="stretch">
                  <Box>
                    <HStack justify="space-between" mb={2}>
                      <Text fontWeight="medium">Daily Goal</Text>
                      <Text color="green.500">4/5 exercises</Text>
                    </HStack>
                    <Progress
                      value={80}
                      colorScheme="green"
                      borderRadius="full"
                    />
                  </Box>
                  <Box>
                    <HStack justify="space-between" mb={2}>
                      <Text fontWeight="medium">Weekly Goal</Text>
                      <Text color="blue.500">18/25 exercises</Text>
                    </HStack>
                    <Progress
                      value={72}
                      colorScheme="blue"
                      borderRadius="full"
                    />
                  </Box>
                  <Box>
                    <HStack justify="space-between" mb={2}>
                      <Text fontWeight="medium">Monthly Challenge</Text>
                      <Text color="purple.500">Level 7</Text>
                    </HStack>
                    <Progress
                      value={65}
                      colorScheme="purple"
                      borderRadius="full"
                    />
                  </Box>
                </VStack>
              </CardBody>
            </Card>

            <Card>
              <CardBody>
                <Heading size="md" mb={6}>
                  Training Settings
                </Heading>
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
                  <Box>
                    <Text fontWeight="medium" mb={2}>
                      Training Goal
                    </Text>
                    <Button colorScheme="blue" variant="outline">
                      Build Muscle
                    </Button>
                  </Box>
                  <Box>
                    <Text fontWeight="medium" mb={2}>
                      Difficulty Level
                    </Text>
                    <Button colorScheme="orange" variant="outline">
                      Intermediate
                    </Button>
                  </Box>
                  <Box>
                    <Text fontWeight="medium" mb={2}>
                      Weekly Target
                    </Text>
                    <Button colorScheme="green" variant="outline">
                      25 exercises
                    </Button>
                  </Box>
                  <Box>
                    <Text fontWeight="medium" mb={2}>
                      Rest Days
                    </Text>
                    <Button colorScheme="purple" variant="outline">
                      2 days/week
                    </Button>
                  </Box>
                </SimpleGrid>
              </CardBody>
            </Card>
          </VStack>
        </Container>
      </Box>
    </LayoutWrapper>
  );
};

export default ProfilePage;
