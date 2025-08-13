"use client";

import { Box, Checkbox, Text } from "@chakra-ui/react";
import Link from "next/link";
import { motion } from "framer-motion";
import React from "react";

const MotionBox = motion(Box);

const PrivacyCheckbox: React.FC = () => {
  return (
    <MotionBox display="flex" gap={2} flexDirection="row">
      <Checkbox borderColor={"gray.400"} />
      <Text color="gray.500">
        I agree with{" "}
        <Link href="/docs/privacy.pdf" className="text-gray-500 underline">
          privacy policy
        </Link>{" "}
        politics
      </Text>
    </MotionBox>
  );
};

export default PrivacyCheckbox;
