"use client";

import {
  Card,
  CardBody,
  Icon,
  SimpleGrid,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { FaFire, FaStar, FaTrophy } from "react-icons/fa";

const MotionCard = motion(Card);

const StatsSection: React.FC = () => (
  <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8} mb={12}>
    <MotionCard
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      bg="white"
      borderRadius="lg"
      boxShadow="base"
    >
      <CardBody>
        <VStack align="start" spacing={4}>
          <Icon as={FaTrophy} w={8} h={8} color="yellow.400" />
          <Stack spacing={2}>
            <Text fontSize="2xl" fontWeight="bold">
              0 XP
            </Text>
            <Text color="gray.600">Total Experience</Text>
          </Stack>
        </VStack>
      </CardBody>
    </MotionCard>

    <MotionCard
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      bg="white"
      borderRadius="lg"
      boxShadow="base"
    >
      <CardBody>
        <VStack align="start" spacing={4}>
          <Icon as={FaFire} w={8} h={8} color="orange.400" />
          <Stack spacing={2}>
            <Text fontSize="2xl" fontWeight="bold">
              0 days
            </Text>
            <Text color="gray.600">Current Streak</Text>
          </Stack>
        </VStack>
      </CardBody>
    </MotionCard>

    <MotionCard
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      bg="white"
      borderRadius="lg"
      boxShadow="base"
    >
      <CardBody>
        <VStack align="start" spacing={4}>
          <Icon as={FaStar} w={8} h={8} color="purple.400" />
          <Stack spacing={2}>
            <Text fontSize="2xl" fontWeight="bold">
              Level 0
            </Text>
            <Text color="gray.600">Current Level</Text>
          </Stack>
        </VStack>
      </CardBody>
    </MotionCard>
  </SimpleGrid>
);

export default StatsSection; 