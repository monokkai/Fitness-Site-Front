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
} from "@chakra-ui/react";

const progressItems = [
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
];

const ProgressSection: React.FC = () => {
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
                <Text color={`${item.color}.500`}>{item.value}</Text>
              </HStack>
              <Progress
                value={item.progress}
                colorScheme={item.color}
                borderRadius="full"
              />
            </Box>
          ))}
        </VStack>
      </CardBody>
    </Card>
  );
};

export default ProgressSection; 