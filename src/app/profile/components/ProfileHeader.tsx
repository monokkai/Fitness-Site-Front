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
  Button,
  VStack,
  HStack,
} from "@chakra-ui/react";
import { useAuth } from "../../shared/context/authContext";
import useUserProfile from "../../shared/hooks/useUserProfile";
import { motion } from "framer-motion";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { useState } from "react";
import EditProfileModal from "../../components/EditProfileModal";
import DeleteAccountModal from "../../components/DeleteAccountPopup";

const MotionBox = motion(Box);

const ProfileHeader: React.FC = () => {
  const { user, isLoading: isAuthLoading, updateUser } = useAuth();
  const {
    data: profile,
    loading: isProfileLoading,
    error,
  } = useUserProfile(user?.id);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

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

  const handleDeleteAccount = async () => {
    console.log("Deleting account...");
    setIsDeleteModalOpen(false);
  };

  return (
    <>
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
            justify="space-between"
          >
            <HStack spacing={{ base: 4, md: 6 }} align="center">
              <Avatar
                size="2xl"
                name={user.username}
                bgGradient="linear(to-r, teal.400, blue.500)"
                color="white"
                boxShadow="md"
                border="4px solid white"
                src={
                  user?.avatarUrl ||
                  (user?.username
                    ? `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(user.username)}`
                    : undefined)
                }
              />
              <Box>
                <Heading
                  size="lg"
                  mb={2}
                  color="black"
                  fontWeight="semibold"
                  letterSpacing="-0.5px"
                >
                  {user.username}
                </Heading>
                <Text color="gray.500" fontSize="sm" mb={2}>
                  Joined on{" "}
                  {createdAtDate && !isNaN(createdAtDate.getTime())
                    ? createdAtDate.toLocaleDateString()
                    : "Unknown"}
                </Text>
                <Badge
                  px={3}
                  py={1}
                  fontSize="0.85em"
                  borderRadius="full"
                  color={"blue.600"}
                  colorScheme="blue"
                  variant="subtle"
                  boxShadow="sm"
                >
                  Goal: {formatTrainingGoal(trainingGoal)}
                </Badge>
              </Box>
            </HStack>

            <VStack spacing={3} align="stretch">
              <Button
                colorScheme="blue"
                variant="outline"
                size="md"
                borderRadius={10}
                onClick={() => setIsEditModalOpen(true)}
              >
                <Text align={"center"} px={3}>
                  <EditIcon /> Edit Profile
                </Text>
              </Button>
              <Button
                bg={"red.300"}
                _hover={{
                  bg: "red.500",
                }}
                variant="solid"
                size="md"
                borderRadius={10}
                onClick={() => setIsDeleteModalOpen(true)}
              >
                <Text align={"center"} px={3}>
                  <DeleteIcon /> Delete Account
                </Text>
              </Button>
            </VStack>
          </Stack>
        </CardBody>
      </MotionBox>

      <EditProfileModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        user={user}
        onUpdate={updateUser}
      />

      <DeleteAccountModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteAccount}
        isLoading={false}
      />
    </>
  );
};

export default ProfileHeader;
