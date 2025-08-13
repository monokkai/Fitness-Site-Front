"use client";

import { Stack, useColorModeValue } from "@chakra-ui/react";
import { motion } from "framer-motion";
import SignupHeader from "./SignupHeader";
import SignupFormContainer from "./SignupFormContainer";
import SignupFooter from "./SignupFooter";

const MotionStack = motion(Stack);

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const SignupForm: React.FC = () => {
  const textColor = useColorModeValue("gray.800", "black");

  return (
    <MotionStack
      spacing="8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      color={"black"}
    >
      <SignupHeader />
      <SignupFormContainer />
      <SignupFooter textColor={textColor} />
    </MotionStack>
  );
};

export default SignupForm;
