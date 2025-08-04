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
import { useEffect, useState } from "react";
import axios from "axios";
import User from "../../shared/interfaces/IUser";

const ProgressSection: React.FC = () => {
  const { user } = useAuth();
  const [progressItems, setProgressItems] = useState([
    {
      label: "Daily Goal",
      value: "0/0 exercises",
      progress: 0,
      color: "green",
    },
    {
      label: "Weekly Goal",
      value: "0/0 exercises",
      progress: 0,
      color: "blue",
    },
    {
      label: "Monthly Challenge",
      value: "Level 0",
      progress: 0,
      color: "purple",
    },
  ]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.id) {
      axios
        .get(`http://localhost:5002/api/user-profiles/${user.id}`)
        .then((response) => {
          const profile = response.data;
          const completed = profile.totalWorkouts || 0;
          const target = profile.workoutsPerWeek || 3;

          setProgressItems([
            {
              label: "Daily Goal",
              value: "0/1 exercises",
              progress: 0,
              color: "green",
            },
            {
              label: "Weekly Goal",
              value: `${Math.min(completed, target)}/${target} exercises`,
              progress: Math.min(100, (completed / target) * 100),
              color: "blue",
            },
            {
              label: "Monthly Challenge",
              value: `Level ${Math.floor(completed / 12)}`,
              progress: ((completed % 12) / 12) * 100,
              color: "purple",
            },
          ]);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [user]);

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
