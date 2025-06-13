"use client";

import { IconButton } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { ChevronLeftIcon } from "@chakra-ui/icons";

const MotionIconButton = motion(IconButton);

const BackButton = () => {
  const router = useRouter();

  return (
    <MotionIconButton
      aria-label="Go back"
      icon={<ChevronLeftIcon boxSize={6} />}
      position="absolute"
      top={4}
      left={4}
      size="lg"
      variant="ghost"
      colorScheme="brand"
      onClick={() => router.push("/")}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      whileHover={{ scale: 1.1, x: -5 }}
      whileTap={{ scale: 0.95 }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 17,
      }}
      _hover={{
        bg: "brand.50",
      }}
    />
  );
};

export default BackButton; 