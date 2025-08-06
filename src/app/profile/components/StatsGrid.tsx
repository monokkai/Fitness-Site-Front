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

interface StatsData {
  label: string;
  value: string | number;
  icon: React.ElementType;
  color: string;
}

const StatsGrid: React.FC = () => {
  const { user } = useAuth();
  const { data: profile, loading, error } = useUserProfile(user?.id);
  const [stats, setStats] = useState<StatsData[]>([]);

  useEffect(() => {
    if (profile) {
      const { currentStreak = 0, totalWorkouts = 0 } = profile;

      setStats([
        {
          label: "Current Streak",
          value: currentStreak,
          icon: FaFire,
          color: "orange",
        },
        {
          label: "Total XP",
          value: totalWorkouts * 10,
          icon: FaTrophy,
          color: "yellow",
        },
        {
          label: "Exercises Done",
          value: totalWorkouts,
          icon: FaDumbbell,
          color: "blue",
        },
        {
          label: "Achievements",
          value: Math.floor(totalWorkouts / 5),
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
                  {loading ? (
                    <Skeleton height="20px" width="50px" />
                  ) : (
                    <StatNumber>{stat.value}</StatNumber>
                  )}
                </Box>
              </HStack>
            </Stat>
          </CardBody>
        </Card>
      ))}
    </SimpleGrid>
  );
};

export default StatsGrid;
