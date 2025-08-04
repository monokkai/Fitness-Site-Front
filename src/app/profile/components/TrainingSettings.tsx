"use client";

import {
  Box,
  Card,
  CardBody,
  Heading,
  SimpleGrid,
  Text,
  Button,
  Skeleton,
} from "@chakra-ui/react";
import { useAuth } from "../../shared/context/authContext";
import { useEffect, useState } from "react";
import axios from "axios";

const TrainingSettings: React.FC = () => {
  const { user } = useAuth();
  const [settings, setSettings] = useState([
    { label: "Training Goal", value: "Not Set", color: "blue" },
    { label: "Difficulty Level", value: "Not Set", color: "orange" },
    { label: "Weekly Target", value: "Not Set", color: "green" },
    { label: "Rest Days", value: "Not Set", color: "purple" },
  ]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.id) {
      axios
        .get(`http://localhost:5002/api/user-profiles/${user.id}`)
        .then((response) => {
          const profile = response.data;
          setSettings([
            {
              label: "Training Goal",
              value: profile.trainingGoal || "Not Set",
              color: "blue",
            },
            { label: "Difficulty Level", value: "Not Set", color: "orange" },
            {
              label: "Weekly Target",
              value: `${profile.workoutsPerWeek || 0} workouts`,
              color: "green",
            },
            { label: "Rest Days", value: "Not Set", color: "purple" },
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
          Training Settings
        </Heading>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
          {settings.map((item, index) => (
            <Box key={index}>
              <Text fontWeight="medium" mb={2}>
                {item.label}
              </Text>
              {loading ? (
                <Skeleton height="40px" width="100%" />
              ) : (
                <Button colorScheme={item.color} variant="outline">
                  {item.value}
                </Button>
              )}
            </Box>
          ))}
        </SimpleGrid>
      </CardBody>
    </Card>
  );
};

export default TrainingSettings;
