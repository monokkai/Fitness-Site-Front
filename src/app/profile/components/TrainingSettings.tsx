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
import { motion } from "framer-motion";

const MotionCard = motion(Card);

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
            value:
              workoutsPerWeek >= 7
                ? "No rest days"
                : `${7 - workoutsPerWeek} days`,
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
    <MotionCard
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
        <Heading
          size="lg"
          color="black"
          mb={6}
          fontWeight="semibold"
          letterSpacing="-0.5px"
        >
          Training Settings
        </Heading>

        {loading ? (
          <Skeleton height="160px" borderRadius="lg" />
        ) : (
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
            {settings.map((item, index) => (
              <Box key={index}>
                <Text fontWeight="medium" fontSize="sm" color="gray.500" mb={2}>
                  {item.label}
                </Text>
                <Button
                  colorScheme={item.color}
                  variant="outline"
                  size="lg"
                  fontWeight="semibold"
                  borderRadius="xl"
                  px={6}
                  width="100%"
                  textAlign="left"
                  _hover={{
                    bg: `${item.color}.50`,
                  }}
                >
                  {item.value}
                </Button>
              </Box>
            ))}
          </SimpleGrid>
        )}
      </CardBody>
    </MotionCard>
  );
};

export default TrainingSettings;
