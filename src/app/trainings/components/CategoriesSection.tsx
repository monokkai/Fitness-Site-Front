"use client";

import {
  Box,
  Card,
  CardBody,
  Heading,
  Icon,
  Progress,
  SimpleGrid,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { TrainingCategory } from "../interfaces/ITraining";
import EmptyCategoryCard from "./EmptyCategoryCard";

const MotionCard = motion(Card);

const CategoriesSection: React.FC = () => {
  const categories: TrainingCategory[] = [];

  return (
    <Box mb={16}>
      <Heading size="lg" mb={6}>
        Training Categories
      </Heading>
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8}>
        {categories.length > 0 ? (
          categories.map((category, index) => (
            <MotionCard
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              cursor="pointer"
              _hover={{ transform: "translateY(-4px)", shadow: "lg" }}
              bg="white"
              borderRadius="lg"
              boxShadow="base"
            >
              <CardBody>
                <VStack align="start" spacing={4}>
                  <Icon
                    as={category.icon}
                    w={6}
                    h={6}
                    color={category.color}
                  />
                  <Stack spacing={2}>
                    <Heading size="md">{category.title}</Heading>
                    <Text color="gray.600">{category.description}</Text>
                    <Box w="full">
                      <Text mb={2} fontSize="sm">
                        Progress: {category.progress}%
                      </Text>
                      <Progress
                        value={category.progress}
                        colorScheme={category.color.split(".")[0]}
                        borderRadius="full"
                      />
                    </Box>
                  </Stack>
                </VStack>
              </CardBody>
            </MotionCard>
          ))
        ) : (
          <>
            <EmptyCategoryCard />
            <EmptyCategoryCard />
            <EmptyCategoryCard />
          </>
        )}
      </SimpleGrid>
    </Box>
  );
};

export default CategoriesSection; 