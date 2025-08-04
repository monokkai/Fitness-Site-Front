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
} from "@chakra-ui/react";
import { FaFire, FaMedal, FaDumbbell, FaTrophy } from "react-icons/fa";

const stats = [
  { label: "Current Streak", value: "0", icon: FaFire, color: "orange" },
  { label: "Total XP", value: "0", icon: FaTrophy, color: "yellow" },
  { label: "Exercises Done", value: "0", icon: FaDumbbell, color: "blue" },
  { label: "Achievements", value: "0", icon: FaMedal, color: "purple" },
];

const StatsGrid: React.FC = () => {
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
                  <StatNumber>{stat.value}</StatNumber>
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
