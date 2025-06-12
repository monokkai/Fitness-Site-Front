import { Container, VStack, Heading, Text, SimpleGrid, Icon, useColorModeValue } from "@chakra-ui/react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { FaRocket, FaLeaf, FaLightbulb, FaGraduationCap } from "react-icons/fa";

const MotionVStack = motion(VStack);
const MotionHeading = motion(Heading);
const MotionText = motion(Text);
const MotionSimpleGrid = motion(SimpleGrid);

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

const values = [
  {
    icon: FaRocket,
    title: "Personal Growth",
    description: "We believe in continuous improvement and pushing your limits to achieve your fitness goals."
  },
  {
    icon: FaLeaf,
    title: "Healthy Lifestyle",
    description: "We promote sustainable fitness habits that lead to long-term health and wellness."
  },
  {
    icon: FaLightbulb,
    title: "Smart Training",
    description: "We use data-driven insights and AI to create personalized workout plans that deliver results."
  },
  {
    icon: FaGraduationCap,
    title: "Expert Guidance",
    description: "We provide professional support and education to help you make informed fitness decisions."
  }
];

export default function ValuesSection() {
  const valuesRef = useRef(null);
  const isValuesInView = useInView(valuesRef, { once: true });

  const textColor = useColorModeValue("gray.600", "gray.400");
  const headingColor = useColorModeValue("gray.900", "white");
  const cardBg = useColorModeValue("gray.50", "gray.800");
  const purpleColor = useColorModeValue("purple.600", "purple.400");

  return (
    <Container maxW="container.xl" py={{ base: "20", md: "32" }}>
      <VStack spacing={16}>
        <MotionVStack
          ref={valuesRef}
          spacing={4}
          textAlign="center"
          initial="hidden"
          animate={isValuesInView ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          <MotionHeading
            as="h2"
            size="xl"
            color={headingColor}
            variants={fadeInUp}
          >
            Our Core Values
          </MotionHeading>
          <MotionText color={textColor} maxW="2xl" variants={fadeInUp}>
            These principles guide everything we do at Git Glade
          </MotionText>
        </MotionVStack>

        <MotionSimpleGrid
          columns={{ base: 1, md: 2, lg: 4 }}
          spacing={8}
          width="full"
          variants={staggerContainer}
          initial="hidden"
          animate={isValuesInView ? "visible" : "hidden"}
        >
          <MotionVStack
            align="start"
            spacing={4}
            p={8}
            bg={cardBg}
            borderRadius="2xl"
            variants={fadeInUp}
            whileHover={{
              y: -5,
              transition: { duration: 0.3, ease: "easeInOut" },
            }}
            style={{ boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" }}
          >
            <Icon as={FaRocket} w={10} h={10} color={purpleColor} />
            <Heading as="h3" size="md" color={headingColor}>
              Personal Growth
            </Heading>
            <Text color={textColor}>
              {values[0].description}
            </Text>
          </MotionVStack>

          <MotionVStack
            align="start"
            spacing={4}
            p={8}
            bg={cardBg}
            borderRadius="2xl"
            variants={fadeInUp}
            whileHover={{
              y: -5,
              transition: { duration: 0.3, ease: "easeInOut" },
            }}
            style={{ boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" }}
          >
            <Icon as={FaLeaf} w={10} h={10} color={purpleColor} />
            <Heading as="h3" size="md" color={headingColor}>
              Healthy Lifestyle
            </Heading>
            <Text color={textColor}>
              {values[1].description}
            </Text>
          </MotionVStack>

          <MotionVStack
            align="start"
            spacing={4}
            p={8}
            bg={cardBg}
            borderRadius="2xl"
            variants={fadeInUp}
            whileHover={{
              y: -5,
              transition: { duration: 0.3, ease: "easeInOut" },
            }}
            style={{ boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" }}
          >
            <Icon as={FaLightbulb} w={10} h={10} color={purpleColor} />
            <Heading as="h3" size="md" color={headingColor}>
              Smart Training
            </Heading>
            <Text color={textColor}>
              {values[2].description}
            </Text>
          </MotionVStack>

          <MotionVStack
            align="start"
            spacing={4}
            p={8}
            bg={cardBg}
            borderRadius="2xl"
            variants={fadeInUp}
            whileHover={{
              y: -5,
              transition: { duration: 0.3, ease: "easeInOut" },
            }}
            style={{ boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" }}
          >
            <Icon as={FaGraduationCap} w={10} h={10} color={purpleColor} />
            <Heading as="h3" size="md" color={headingColor}>
              Expert Guidance
            </Heading>
            <Text color={textColor}>
              {values[3].description}
            </Text>
          </MotionVStack>
        </MotionSimpleGrid>
      </VStack>
    </Container>
  );
} 