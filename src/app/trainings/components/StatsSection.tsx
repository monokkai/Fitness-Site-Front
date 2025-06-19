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
import { motion, useReducedMotion } from "framer-motion";
import { FaFire, FaStar, FaTrophy } from "react-icons/fa";

const MotionCard = motion(Card);

const StatsSection: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  
  const cards = [
    {
      icon: FaTrophy,
      color: "yellow.400",
      value: "0 XP",
      label: "Total Experience",
    },
    {
      icon: FaFire,
      color: "orange.400",
      value: "0 days",
      label: "Current Streak",
    },
    {
      icon: FaStar,
      color: "purple.400",
      value: "Level 0",
      label: "Current Level",
    },
  ];

  return (
    <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8} mb={12}>
      {cards.map((card, index) => (
        <MotionCard
          key={index}
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          bg="white"
          borderRadius="lg"
          boxShadow="base"
          whileHover={shouldReduceMotion ? {} : { y: -2 }}
        >
          <CardBody>
            <VStack align="start" spacing={4}>
              <Icon as={card.icon} w={8} h={8} color={card.color} />
              <Stack spacing={2}>
                <Text fontSize="2xl" fontWeight="bold">
                  {card.value}
                </Text>
                <Text color="gray.600">{card.label}</Text>
              </Stack>
            </VStack>
          </CardBody>
        </MotionCard>
      ))}
    </SimpleGrid>
  );
};

export default StatsSection; 