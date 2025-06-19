"use client";

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
              Profile
            </Heading>
            <Text color="gray.600" mb={4}>
              Joined: -
            </Text>
            <Badge colorScheme="blue" fontSize="md" p={2}>
              Goal: Not Set
            </Badge>
          </Box>
        </Stack>
      </CardBody>
    </Card>
  );
};

export default ProfileHeader; 