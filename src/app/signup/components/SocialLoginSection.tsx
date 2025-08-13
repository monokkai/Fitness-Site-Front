"use client";

import { Stack, Flex, Divider, Text, Button, Box } from "@chakra-ui/react";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

interface SocialLoginSectionProps {
  textColor: string;
}

const SocialLoginSection: React.FC<SocialLoginSectionProps> = ({
  textColor,
}) => {
  return (
    <Stack spacing="6" mt="8">
      <Stack spacing="3">
        <Flex align="center" gap={4}>
          <Divider flex="1" />
          <Text color="gray.500" fontSize="sm" whiteSpace="nowrap">
            OR CONTINUE WITH
          </Text>
          <Divider flex="1" />
        </Flex>
      </Stack>

      <Flex gap="4">
        <MotionBox
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          flex="1"
        >
          <Button
            w="full"
            variant="outline"
            leftIcon={<FaGoogle />}
            size="lg"
            borderRadius="xl"
            color={textColor}
            _hover={{ bg: "gray.100" }}
          >
            Google
          </Button>
        </MotionBox>
        <MotionBox
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          flex="1"
        >
          <Button
            w="full"
            variant="outline"
            leftIcon={<FaGithub />}
            size="lg"
            borderRadius="xl"
            color={textColor}
            _hover={{ bg: "gray.100" }}
          >
            GitHub
          </Button>
        </MotionBox>
      </Flex>
    </Stack>
  );
};

export default SocialLoginSection;
