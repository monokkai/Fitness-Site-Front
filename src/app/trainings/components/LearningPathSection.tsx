"use client";

import { Box, Heading } from "@chakra-ui/react";
import Roadmap from "./Roadmap";

const LearningPathSection: React.FC = () => (
  <Box>
    <Heading size="lg" mb={6}>
      Learning Path
    </Heading>
    <Box mt={10} minH="300px" p={6} borderRadius="xl" shadow="sm" bg="white">
      <Roadmap />
    </Box>
  </Box>
);

export default LearningPathSection; 