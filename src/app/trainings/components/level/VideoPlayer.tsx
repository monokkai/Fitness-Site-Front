"use client";

import {
  Card,
  CardBody,
  Center,
  VStack,
  Icon,
  Text,
  Box,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { FaDumbbell } from "react-icons/fa";

export const VideoPlayer: React.FC = () => (
  <motion.div
    initial={{ opacity: 0, x: -50 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: 0.4 }}
  >
    <Card bg="white" shadow="lg" height="400px">
      <CardBody>
        <Center height="100%">
          <VStack spacing={4}>
            <Box
              w="200px"
              h="200px"
              borderRadius="20px"
              bg="gray.100"
              display="flex"
              alignItems="center"
              justifyContent="center"
              border="4px dashed"
              borderColor="gray.300"
            >
              <Icon as={FaDumbbell} w={16} h={16} color="gray.400" />
            </Box>
            <Text color="gray.500" textAlign="center">
              Video demonstration will appear here
            </Text>
          </VStack>
        </Center>
      </CardBody>
    </Card>
  </motion.div>
);
