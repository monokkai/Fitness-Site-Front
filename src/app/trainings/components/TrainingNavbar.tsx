"use client";

import { Box, Container, IconButton } from "@chakra-ui/react";
import { FaUserCircle } from "react-icons/fa";
import { motion } from "framer-motion";

export const TrainingNavbar: React.FC = () => {
  return (
    <Box
      as="nav"
      bg="white"
      boxShadow="sm"
      position="fixed"
      top={0}
      left={0}
      right={0}
      zIndex={1000}
    >
      <Container maxW="container.xl">
        <motion.div
          style={{
            height: "64px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Box fontSize="2xl" fontWeight="bold" color="blue.500">
            HandFit
          </Box>
          <IconButton
            aria-label="Profile"
            icon={<FaUserCircle size={24} />}
            variant="ghost"
            colorScheme="blue"
            size="lg"
            _hover={{ bg: "blue.50" }}
          />
        </motion.div>
      </Container>
    </Box>
  );
};
