"use client";

import {
  Box,
  Card,
  CardBody,
  Heading,
  VStack,
  HStack,
  Text,
  Progress,
  Skeleton,
} from "@chakra-ui/react";
import { useAuth } from "../../shared/context/authContext";
import useUserProfile from "../../shared/hooks/useUserProfile";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

const ProgressSection: React.FC = () => {
  const { user } = useAuth();
  const { data: profile, loading, error } = useUserProfile(user?.id);

  const progressItems = [
    {
      label: "Daily Goal",
      value: "0/1 exercises",
      progress: 0,
      color: "green",
    },
    {
      label: "Weekly Goal",
      value: profile
        ? `${Math.min(profile.totalWorkouts || 0, profile.workoutsPerWeek || 3)}/${profile.workoutsPerWeek || 3} exercises`
        : "0/3 exercises",
      progress: profile
        ? Math.min(
            100,
            ((profile.totalWorkouts || 0) / (profile.workoutsPerWeek || 3)) *
              100
          )
        : 0,
      color: "blue",
    },
    {
      label: "Monthly Challenge",
      value: profile
        ? `Level ${Math.floor((profile.totalWorkouts || 0) / 12)}`
        : "Level 0",
      progress: profile ? (((profile.totalWorkouts || 0) % 12) / 12) * 100 : 0,
      color: "purple",
    },
  ];

  if (error) {
    return <Text color="red.500">Failed to load progress data</Text>;
  }

  return (
    <MotionBox
      as={Card}
      bg="white"
      color="black"
      boxShadow="lg"
      borderRadius="2xl"
      p={{ base: 4, md: 6 }}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <CardBody>
        <Heading size="lg" mb={6} fontWeight="semibold" letterSpacing="-0.5px">
          Current Progress
        </Heading>
        <VStack spacing={6} align="stretch">
          {progressItems.map((item, index) => (
            <Box key={index}>
              <HStack justify="space-between" mb={2}>
                <Text fontWeight="medium">{item.label}</Text>
                {loading ? (
                  <Skeleton height="20px" width="100px" borderRadius="md" />
                ) : (
                  <Text color={`${item.color}.500`} fontWeight="semibold">
                    {item.value}
                  </Text>
                )}
              </HStack>
              {loading ? (
                <Skeleton height="12px" borderRadius="full" />
              ) : (
                <Progress
                  value={item.progress}
                  colorScheme={item.color}
                  height="10px"
                  borderRadius="full"
                  bg={`${item.color}.100`}
                  transition="all 0.4s ease"
                />
              )}
            </Box>
          ))}
        </VStack>
      </CardBody>
    </MotionBox>
  );
};

export default ProgressSection;
