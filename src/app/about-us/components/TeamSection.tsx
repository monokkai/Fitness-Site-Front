import {
  Box,
  Container,
  VStack,
  Heading,
  Text,
  SimpleGrid,
  useColorModeValue,
  Button,
  Flex,
} from "@chakra-ui/react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import TeamMemberCard from "./TeamMemberCard";
import teamMembers from "./utils/teamMembers";

const MotionVStack = motion(VStack);
const MotionHeading = motion(Heading);
const MotionText = motion(Text);
const MotionSimpleGrid = motion(SimpleGrid);
const MotionFlex = motion(Flex);

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

export default function TeamSection() {
  const teamRef = useRef(null);
  const isTeamInView = useInView(teamRef, { once: true });

  const textColor = useColorModeValue("gray.600", "gray.400");
  const headingColor = useColorModeValue("gray.900", "white");

  return (
    <Box
      bg={useColorModeValue("gray.50", "gray.800")}
      py={{ base: "20", md: "32" }}
    >
      <Container maxW="container.2xl">
        <VStack spacing={16}>
          <MotionVStack
            ref={teamRef}
            spacing={4}
            textAlign="center"
            initial="hidden"
            animate={isTeamInView ? "visible" : "hidden"}
            variants={staggerContainer}
          >
            <MotionHeading
              as="h2"
              size="xl"
              color={headingColor}
              variants={fadeInUp}
            >
              Meet Our Fitness Experts
            </MotionHeading>
            <MotionText color={textColor} maxW="2xl" variants={fadeInUp}>
              The passionate team dedicated to helping you achieve your fitness goals
            </MotionText>
          </MotionVStack>

          <MotionFlex
            justifyContent="center"
            width="full"
            initial="hidden"
            animate={isTeamInView ? "visible" : "hidden"}
            variants={staggerContainer}
          >
            <MotionSimpleGrid
              minChildWidth="400px"
              spacing={8}
              maxW="container.xl"
            >
              {teamMembers.map((member, index) => (
                <TeamMemberCard key={index} {...member} />
              ))}
            </MotionSimpleGrid>
          </MotionFlex>

          <MotionVStack
            spacing={8}
            p={10}
            bg="purple.600"
            color="white"
            borderRadius="2xl"
            textAlign="center"
            maxW="2xl"
            variants={fadeInUp}
            initial="hidden"
            animate={isTeamInView ? "visible" : "hidden"}
            whileHover={{
              scale: 1.02,
              transition: { duration: 0.3, ease: "easeInOut" },
            }}
          >
            <Heading as="h3" size="lg">
              Join Our Team
            </Heading>
            <Text fontSize="lg" opacity={0.9}>
              We&apos;re always looking for talented individuals who share our
              passion for AI and developer tools
            </Text>
            <Button
              size="lg"
              bg="white"
              color="purple.600"
              borderRadius={20}
              _hover={{
                bg: "gray.100",
                transform: "translateY(-2px)",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
              }}
            >
              View Open Positions
            </Button>
          </MotionVStack>
        </VStack>
      </Container>
    </Box>
  );
}
