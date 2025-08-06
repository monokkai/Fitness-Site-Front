"use client";

import {
  Spinner,
  Text,
  Avatar,
  Box,
  Card,
  CardBody,
  Stack,
  Heading,
  Badge,
} from "@chakra-ui/react";
import { useAuth } from "../../shared/context/authContext";
import useUserProfile from "../../shared/hooks/useUserProfile";

const ProfileHeader: React.FC = () => {
  const { user, isLoading: isAuthLoading } = useAuth();
  const {
    data: profile,
    loading: isProfileLoading,
    error,
  } = useUserProfile(user?.id);

  if (isAuthLoading || isProfileLoading) return <Spinner />;
  if (!user) return <Text color="red.500">User not authenticated</Text>;
  if (error) return <Text color="red.500">{error}</Text>;

  const createdAtDate = user?.createdAt ? new Date(user.createdAt) : null;
  const trainingGoal = profile?.trainingGoal || "Not Set";

  // Форматируем цель тренировки для отображения
  const formatTrainingGoal = (goal: string) => {
    switch (goal) {
      case "WeightGain":
        return "Weight Gain";
      case "WeightLoss":
        return "Weight Loss";
      case "Cardio":
        return "Cardio Training";
      default:
        return goal;
    }
  };

  return (
    <Card>
      <CardBody>
        <Stack
          direction={{ base: "column", md: "row" }}
          spacing={8}
          align="center"
        >
          <Avatar
            size="2xl"
            name={user.username}
            src={
              user?.username
                ? `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(user.username)}`
                : undefined
            }
          />
          <Box flex={1}>
            <Heading size="lg" mb={2}>
              Profile: {user.username}
            </Heading>
            <Text color="gray.600" mb={4}>
              Joined:{" "}
              {createdAtDate && !isNaN(createdAtDate.getTime())
                ? createdAtDate.toLocaleDateString()
                : "Unknown"}
            </Text>
            <Badge colorScheme="blue" borderRadius="full" fontSize="md" p={3}>
              Goal: {formatTrainingGoal(trainingGoal)}
            </Badge>
          </Box>
        </Stack>
      </CardBody>
    </Card>
  );
};

export default ProfileHeader;
