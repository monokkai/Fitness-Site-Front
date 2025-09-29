"use client";

import {
  Box,
  Card,
  CardBody,
  SimpleGrid,
  HStack,
  Stat,
  StatLabel,
  StatNumber,
  Skeleton,
  Text,
} from "@chakra-ui/react";
import { FaFire, FaMedal, FaDumbbell, FaTrophy } from "react-icons/fa";
import { useAuth } from "../../shared/context/authContext";
import useUserProfile from "../../shared/hooks/useUserProfile";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface StatsData {
  label: string;
  value: string | number;
  icon: React.ElementType;
  color: string;
}

const MotionCard = motion(Card);

const StatsGrid: React.FC = () => {
  const { user } = useAuth();
  const { data: profile, loading, error } = useUserProfile(user?.id);
  const [stats, setStats] = useState<StatsData[]>([]);

  useEffect(() => {
    if (profile) {
      const { currentStreak = 0, totalWorkouts = 0, totalXP = 0, currentLevel = 1 } = profile;

      setStats([
        {
          label: "Current Level",
          value: currentLevel,
          icon: FaTrophy,
          color: "blue",
        },
        {
          label: "Total XP",
          value: totalXP,
          icon: FaFire,
          color: "yellow",
        },
        {
          label: "Exercises Done",
          value: totalWorkouts,
          icon: FaDumbbell,
          color: "green",
        },
        {
          label: "Current Streak",
          value: currentStreak,
          icon: FaMedal,
          color: "purple",
        },
      ]);
    }
  }, [profile]);

  if (error) {
    return <Text color="red.500">Failed to load stats</Text>;
  }

  return (
    <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} spacing={6}>
      {stats.map((stat, index) => (
        <MotionCard
          key={index}
          bg="white"
          color="black"
          boxShadow="md"
          borderRadius="2xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1, duration: 0.5 }}
        >
          <CardBody>
            <Stat>
              <HStack spacing={4} align="center">
                <Box
                  p={3}
                  bg={`${stat.color}.100`}
                  color={`${stat.color}.500`}
                  borderRadius="full"
                  boxSize="48px"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <stat.icon size={20} />
                </Box>
                <Box>
                  <StatLabel fontSize="sm" color="gray.500">
                    {stat.label}
                  </StatLabel>
                  {loading ? (
                    <Skeleton height="24px" width="60px" borderRadius="md" />
                  ) : (
                    <StatNumber fontSize="xl" fontWeight="bold">
                      {stat.value}
                    </StatNumber>
                  )}
                </Box>
              </HStack>
            </Stat>
          </CardBody>
        </MotionCard>
      ))}
    </SimpleGrid>
  );
};

export default StatsGrid;
