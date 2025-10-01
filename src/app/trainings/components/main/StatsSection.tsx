"use client";

import {
  Card,
  CardBody,
  Icon,
  SimpleGrid,
  Stack,
  Text,
  VStack,
  Spinner,
} from "@chakra-ui/react";
import { motion, useReducedMotion } from "framer-motion";
import { FaFire, FaStar, FaTrophy, FaDumbbell } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useAuth } from "../../../shared/context/authContext";
import { API_URL } from "@/app/shared/config/api.config";
import useUserProfile from "../../../shared/hooks/useUserProfile";

const MotionCard = motion.create(Card);

const StatsSection: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const { user } = useAuth();
  const { data: profile, loading, refetch } = useUserProfile(user?.id);
  
  const stats = {
    totalXP: profile?.totalXP || 0,
    currentLevel: profile?.currentLevel || 1,
    totalWorkouts: profile?.totalWorkouts || 0,
    currentStreak: profile?.currentStreak || 0
  };
  
  // Refresh stats when page becomes visible
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden && user?.id) {
        refetch();
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [user?.id, refetch]);
  
  // Refresh stats every 5 seconds when on trainings page
  useEffect(() => {
    const interval = setInterval(() => {
      if (user?.id) {
        refetch();
      }
    }, 5000);
    
    return () => clearInterval(interval);
  }, [user?.id, refetch]);

  const cards = [
    {
      icon: FaTrophy,
      color: "yellow.400",
      value: loading ? <Spinner size="sm" /> : `${stats.totalXP} XP`,
      label: "Total Experience",
    },
    {
      icon: FaDumbbell,
      color: "blue.400",
      value: loading ? <Spinner size="sm" /> : `${stats.totalWorkouts}`,
      label: "Workouts Completed",
    },
    {
      icon: FaStar,
      color: "purple.400",
      value: loading ? <Spinner size="sm" /> : `Level ${stats.currentLevel}`,
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
                <Text fontSize="2xl" color={"gray.700"} fontWeight="bold">
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
