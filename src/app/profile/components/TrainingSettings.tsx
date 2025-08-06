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
import { TRAINING_URL } from "@/app/shared/config/api.config";
import ProfileData from "@/app/shared/interfaces/IProfileData";

const TrainingSettings: React.FC = () => {
  const { user } = useAuth();
  const [settings, setSettings] = useState([
    { label: "Training Goal", value: "Not Set", color: "blue" },
    { label: "Difficulty Level", value: "Not Set", color: "orange" },
    { label: "Weekly Target", value: "Not Set", color: "green" },
    { label: "Rest Days", value: "Not Set", color: "purple" },
  ]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!user?.id) return;

      try {
        const response = await axios.get<ProfileData>(
          `${TRAINING_URL}/user-profiles/${user.id}`
        );

        const { trainingGoal = "Not Set", workoutsPerWeek = 3 } = response.data;

        setSettings([
          {
            label: "Training Goal",
            value: trainingGoal,
            color: "blue",
          },
          {
            label: "Difficulty Level",
            value: "Intermediate",
            color: "orange",
          },
          {
            label: "Weekly Target",
            value: `${workoutsPerWeek} workouts`,
            color: "green",
          },
          {
            label: "Rest Days",
            value: `${7 - workoutsPerWeek} days`,
            color: "purple",
          },
        ]);
      } catch (err) {
        console.error("Failed to load profile:", err);
        setError("Failed to load training settings");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  if (error) {
    return <Text color="red.500">{error}</Text>;
  }

  return (
    <Card>
      <CardBody>
        <Heading size="md" mb={6}>
          Training Settings
        </Heading>
        {loading ? (
          <Skeleton height="100px" />
        ) : (
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
            {settings.map((item, index) => (
              <Box key={index}>
                <Text fontWeight="medium" mb={2}>
                  {item.label}
                </Text>
                <Button
                  colorScheme={item.color}
                  variant="outline"
                  minW="150px"
                  textAlign="left"
                >
                  {item.value}
                </Button>
              </Box>
            ))}
          </SimpleGrid>
        )}
      </CardBody>
    </Card>
  );
};

export default TrainingSettings;
