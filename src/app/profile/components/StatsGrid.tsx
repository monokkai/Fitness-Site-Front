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
} from "@chakra-ui/react";
import { FaFire, FaMedal, FaDumbbell, FaTrophy } from "react-icons/fa";
import { useAuth } from "../../shared/context/authContext";
import { useEffect, useState } from "react";
import axios from "axios";

interface StatsData {
  label: string;
  value: string | number;
  icon: React.ElementType;
  color: string;
}

const StatsGrid: React.FC = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState<StatsData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.id) {
      axios
        .get(`http://localhost:5002/api/user-profiles/${user.id}`)
        .then((response) => {
          const profile = response.data;
          setStats([
            {
              label: "Current Streak",
              value: profile.currentStreak || "0",
              icon: FaFire,
              color: "orange",
            },
            { label: "Total XP", value: "0", icon: FaTrophy, color: "yellow" },
            {
              label: "Exercises Done",
              value: profile.totalWorkouts || "0",
              icon: FaDumbbell,
              color: "blue",
            },
            {
              label: "Achievements",
              value: "0",
              icon: FaMedal,
              color: "purple",
            },
          ]);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [user]);

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
