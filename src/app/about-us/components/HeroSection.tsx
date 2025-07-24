import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  Flex,
  Button,
} from "@chakra-ui/react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";

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

  return (
    <Box
      ref={heroRef}
      minH="100vh"
      className="relative overflow-hidden py-20 sm:py-28 text-center items-center flex justify-center"
      bg="white"
    >
      <Box
        as="video"
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
        onError={(e: React.SyntheticEvent<HTMLVideoElement, Event>) => {
          console.error("Error loading video:", e);
        }}
        onEnded={(e: React.SyntheticEvent<HTMLVideoElement, Event>) => {
          e.currentTarget.play();
        }}
      >
        <source
          src="http://localhost:80/media/about_run.mp4"
          type="video/mp4"
        />
      </Box>

      <Box
        as="div"
        className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center"
      >
        <Box as="div" className="w-[1000px] h-[1000px] rounded-full" />
      </Box>

      <Container maxW="container.xl" position="relative" zIndex={1}>
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
            color="white"
            variants={fadeInUp}
          >
            About <span className="text-[#AAFF03]">HandFit</span>
          </MotionHeading>
          <MotionText
            fontSize="xl"
            maxW="2xl"
            color="gray.400"
            variants={fadeInUp}
          >
            We&apos;re revolutionizing the fitness industry with AI-powered
            workout plans and smart progress tracking. Our mission is to make
            fitness accessible, enjoyable, and effective for everyone.
          </MotionText>
          <MotionFlex
            gap={4}
            variants={fadeInUp}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Link href="/auth" passHref>
              <Button
                size="lg"
                bg="brand.300"
                color="black"
                borderRadius={30}
                _hover={{
                  bg: "brand.400",
                  boxShadow: "0 0 12px rgba(170, 255, 3, 0.7)",
                }}
              >
                Start Training
              </Button>
            </Link>
            <Link href="/pricing" passHref>
              <Button
                size="lg"
                variant="outline"
                color="gray.400"
                borderColor="gray.300"
                borderRadius={30}
                _hover={{
                  bg: "white",
                  color: "black",
                }}
              >
                View Plans
              </Button>
            </Link>
          </MotionFlex>
        </MotionVStack>
      </Container>
    </Box>
  );
}
