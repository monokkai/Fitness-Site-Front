"use client";

import {
  Box,
  Card,
  CardBody,
  Heading,
  SimpleGrid,
  Text,
  Button,
} from "@chakra-ui/react";

const settingsItems = [
  {
    label: "Training Goal",
    value: "Not Set",
    color: "blue",
  },
  {
    label: "Difficulty Level",
    value: "Not Set",
    color: "orange",
  },
  {
    label: "Weekly Target",
    value: "Not Set",
    color: "green",
  },
  {
    label: "Rest Days",
    value: "Not Set",
    color: "purple",
  },
];

const TrainingSettings: React.FC = () => {
  return (
    <Card>
      <CardBody>
        <Heading size="md" mb={6}>
          Training Settings
        </Heading>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
          {settingsItems.map((item, index) => (
            <Box key={index}>
              <Text fontWeight="medium" mb={2}>
                {item.label}
              </Text>
              <Button colorScheme={item.color} variant="outline">
                {item.value}
              </Button>
            </Box>
          ))}
        </SimpleGrid>
      </CardBody>
    </Card>
  );
};

export default TrainingSettings;
