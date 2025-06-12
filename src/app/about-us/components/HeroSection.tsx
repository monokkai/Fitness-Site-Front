import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  Flex,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const MotionVStack = motion(VStack);
const MotionHeading = motion(Heading);
const MotionText = motion(Text);
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

export default function HeroSection() {
  const heroRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: true });

  const purpleColor = useColorModeValue("purple.600", "purple.400");

  return (
    <Box
      ref={heroRef}
      bg="white"
      color="black"
      py={{ base: "20", md: "32" }}
      px={{ base: "4", md: "8" }}
      position="relative"
      overflow="hidden"
      minH={"100vh"}
      className="text-center items-center flex justify-center"
      boxShadow={useColorModeValue("0 4px 6px rgba(0, 0, 0, 0.1)", "none")}
    >
      <Box
        as="div"
        className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center"
      >
        <Box as="div" className="w-[1000px] h-[1000px] rounded-full" />
      </Box>

      <Container maxW="container.xl">
        <MotionVStack
          spacing={8}
          align="center"
          textAlign="center"
          initial="hidden"
          animate={isHeroInView ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          <MotionHeading
            as="h1"
            size="2xl"
            fontWeight="bold"
            maxW="3xl"
            variants={fadeInUp}
          >
            Effortless Workouts & Smart Fitness Analysis
          </MotionHeading>
          <MotionText
            fontSize="xl"
            maxW="2xl"
            opacity={0.9}
            variants={fadeInUp}
          >
            Generate comprehensive, personalized workout plans automatically. Our AI analyzes your 
            fitness history, understands your progress, and provides deep insights to streamline 
            your training journey.
          </MotionText>
          <MotionFlex
            gap={4}
            variants={fadeInUp}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button
              size="lg"
              bg="black"
              color="white"
              borderRadius={20}
              _hover={{
                bg: "gray.800",
                boxShadow: "0 0 8px rgba(0, 0, 0, 0.2)",
              }}
            >
              Start Training
            </Button>
            <Button
              size="lg"
              variant="outline"
              color="black"
              borderColor="black"
              borderRadius={20}
              _hover={{
                bg: "black",
                color: "white",
              }}
            >
              View Plans
            </Button>
          </MotionFlex>
        </MotionVStack>
      </Container>
    </Box>
  );
}
