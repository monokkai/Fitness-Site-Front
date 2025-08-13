"use client";

import { Text, Button } from "@chakra-ui/react";
import Link from "next/link";
import { motion } from "framer-motion";
import React from "react";

const MotionText = motion(Text);

interface SignupFooterProps {
  textColor: string;
}

const SignupFooter: React.FC<SignupFooterProps> = ({ textColor }) => {
  return (
    <MotionText
      textAlign="center"
      color={textColor}
      whileHover={{ scale: 1.02 }}
    >
      Already have an account?{" "}
      <Link href="/auth" passHref>
        <Button variant="link" color="blue.500" _hover={{ color: "blue.600" }}>
          Sign in
        </Button>
      </Link>
    </MotionText>
  );
};

export default SignupFooter;
