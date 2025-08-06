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
    <Card>
      <CardBody>
        <Heading size="md" mb={6}>
          Current Progress
        </Heading>
        <VStack spacing={6} align="stretch">
          {progressItems.map((item, index) => (
            <Box key={index}>
              <HStack justify="space-between" mb={2}>
                <Text fontWeight="medium">{item.label}</Text>
                {loading ? (
                  <Skeleton height="20px" width="100px" />
                ) : (
                  <Text color={`${item.color}.500`}>{item.value}</Text>
                )}
              </HStack>
              {loading ? (
                <Skeleton height="10px" width="100%" />
              ) : (
                <Progress
                  value={item.progress}
                  colorScheme={item.color}
                  borderRadius="full"
                />
              )}
            </Box>
          ))}
        </VStack>
      </CardBody>
    </Card>
  );
};

export default ProgressSection;
