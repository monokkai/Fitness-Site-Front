"use client";

import { Box, Button } from "@chakra-ui/react";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

interface SubmitButtonProps {
  isSubmitting: boolean;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ isSubmitting }) => {
  return (
    <MotionBox>
      <Button
        type="submit"
        size="lg"
        colorScheme="blue"
        borderRadius="xl"
        width="100%"
        _hover={{ bg: "blue.600" }}
        isLoading={isSubmitting}
        loadingText="Creating account..."
      >
        Create Account
      </Button>
    </MotionBox>
  );
};

export default SubmitButton;
