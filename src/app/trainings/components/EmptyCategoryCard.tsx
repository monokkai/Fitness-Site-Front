"use client";

import { Card, CardBody, Center, Icon, Text, VStack } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { FaPlus } from "react-icons/fa";

const MotionCard = motion(Card);

const EmptyCategoryCard: React.FC = () => (
  <MotionCard
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    cursor="pointer"
    _hover={{ transform: "translateY(-4px)", shadow: "lg" }}
    height="250px"
    bg="white"
    borderRadius="lg"
    boxShadow="base"
  >
    <CardBody>
      <Center height="100%">
        <VStack spacing={4}>
          <Icon as={FaPlus} w={8} h={8} color="gray.300" />
          <Text color="gray.500">No categories available</Text>
        </VStack>
      </Center>
    </CardBody>
  </MotionCard>
);

export default EmptyCategoryCard; 