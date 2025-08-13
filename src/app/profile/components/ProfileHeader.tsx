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
import { motion } from "framer-motion";

const MotionBox = motion(Box);

const ProfileHeader: React.FC = () => {
  const { user, isLoading: isAuthLoading } = useAuth();
  const {
    data: profile,
    loading: isProfileLoading,
    error,
  } = useUserProfile(user?.id);

  if (isAuthLoading || isProfileLoading)
    return <Spinner size="xl" color="blue.400" />;
  if (!user) return <Text color="red.500">User not authenticated</Text>;
  if (error) return <Text color="red.500">{error}</Text>;

  const createdAtDate = user?.createdAt
    ? new Date(user.createdAt.replace(" ", "T"))
    : null;
  const trainingGoal = profile?.trainingGoal || "Not Set";

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
        <Stack
          direction={{ base: "column", md: "row" }}
          spacing={{ base: 6, md: 10 }}
          align="center"
        >
          <Avatar
            size="2xl"
            name={user.username}
            bgGradient="linear(to-r, teal.400, blue.500)"
            color="white"
            boxShadow="md"
            border="4px solid white"
            src={
              user?.username
                ? `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(user.username)}`
                : undefined
            }
          />
          <Box flex={1}>
            <Heading
              size="lg"
              mb={2}
              color="black"
              fontWeight="semibold"
              letterSpacing="-0.5px"
            >
              {user.username}
            </Heading>
            <Text color="gray.500" fontSize="sm" mb={4}>
              Joined on{" "}
              {createdAtDate && !isNaN(createdAtDate.getTime())
                ? createdAtDate.toLocaleDateString()
                : "Unknown"}
            </Text>
            <Badge
              px={4}
              py={2}
              fontSize="0.9em"
              borderRadius="full"
              color={"blue.600"}
              colorScheme="blue"
              variant="subtle"
              boxShadow="sm"
            >
              Goal: {formatTrainingGoal(trainingGoal)}
            </Badge>
          </Box>
        </Stack>
      </CardBody>
    </MotionBox>
  );
};

export default ProfileHeader;
