import { Container, VStack, Heading, Text, SimpleGrid, Icon, useColorModeValue, Box } from "@chakra-ui/react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import values from "./utils/values";

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



export default function ValuesSection() {
  const valuesRef = useRef(null);
  const isValuesInView = useInView(valuesRef, { once: true });

  const textColor = useColorModeValue("gray.600", "gray.400");
  const headingColor = useColorModeValue("gray.900", "white");
  const cardBg = useColorModeValue("white", "gray.800");

  return (
    <Box bg="white" py={{ base: "20", md: "32" }}>
      <Container maxW="container.xl">
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
              size="2xl"
              color={headingColor}
              variants={fadeInUp}
            >
              Our Core Values
            </MotionHeading>
            <MotionText color={textColor} maxW="2xl" variants={fadeInUp}>
              These principles guide everything we do at HandFit+
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
            {values.map((value, index) => (
              <MotionVStack
                key={index}
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
                <Icon as={value.icon} w={10} h={10} color="brand.300" />
                <Heading as="h3" size="md" color={headingColor}>
                  {value.title}
                </Heading>
                <Text color={textColor}>
                  {value.description}
                </Text>
              </MotionVStack>
            ))}
          </MotionSimpleGrid>
        </VStack>
      </Container>
    </Box>
  );
} 