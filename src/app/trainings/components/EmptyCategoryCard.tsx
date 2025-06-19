"use client";

import { Card, CardBody, Center, Icon, Text, VStack } from "@chakra-ui/react";
import { motion, useReducedMotion } from "framer-motion";
import { FaPlus } from "react-icons/fa";

const MotionCard = motion(Card);

const EmptyCategoryCard: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  
  return (
    <MotionCard
      initial={shouldReduceMotion ? {} : { opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      cursor="pointer"
      height="250px"
      bg="white"
      borderRadius="lg"
      boxShadow="base"
      whileHover={shouldReduceMotion ? {} : { y: -2, boxShadow: "md" }}
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
}

export default EmptyCategoryCard; 