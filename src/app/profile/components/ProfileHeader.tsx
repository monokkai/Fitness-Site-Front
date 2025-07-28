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
import { useCurrentUser } from "../../shared/hooks/useCurrentUser";

const ProfileHeader: React.FC = () => {
  const { user, loading } = useCurrentUser();

  if (loading) return <Spinner />;
  if (!user) return <Text color="red.500">User not authenticated</Text>;
  const createdAtDate = user?.createdAt ? new Date(user.createdAt) : null;

  return (
    <Card>
      <CardBody>
        <Stack
          direction={{ base: "column", md: "row" }}
          spacing={8}
          align="center"
        >
          <Avatar size="2xl" name={user.username} />
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
              Goal: {user.goal ?? "Not Set"}
            </Badge>
          </Box>
        </Stack>
      </CardBody>
    </Card>
  );
};

export default ProfileHeader;
