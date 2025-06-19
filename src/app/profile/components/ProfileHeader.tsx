"use client";

import { useUserStore } from "@/app/shared/store/userStore";
import {
  Avatar,
  Box,
  Card,
  CardBody,
  Stack,
  Heading,
  Text,
  Badge,
} from "@chakra-ui/react";

const ProfileHeader: React.FC = () => {
  const { user } = useUserStore();
  return (
    <Card>
      <CardBody>
        <Stack
          direction={{ base: "column", md: "row" }}
          spacing={8}
          align="center"
        >
          <Avatar size="2xl" />
          <Box flex={1}>
            <Heading size="lg" mb={2}>
              Profile: {user?.username || "Unknown"}
            </Heading>
            <Text color="gray.600" mb={4}>
              Joined: {user?.createdAt || "Not Stated"}
            </Text>
            <Badge colorScheme="blue" borderRadius="full" fontSize="md" p={3}>
              Goal: {/* Goal: {user?.goal || "Not Set"} */}
            </Badge>
          </Box>
        </Stack>
      </CardBody>
    </Card>
  );
};

export default ProfileHeader;
