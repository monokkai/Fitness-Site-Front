"use client";
import {
  Box,
  Flex,
  Heading,
  Text,
  Button,
  useColorModeValue,
  VStack,
  List,
  ListItem,
  ListIcon,
  Divider,
  Tag,
  TagLabel,
} from "@chakra-ui/react";
import { FaCheckCircle } from "react-icons/fa";
import { motion, Variants } from "framer-motion";
import plans from "../utils/plans";

const MotionBox = motion(Box);
const MotionVStack = motion(VStack);
const MotionText = motion(Text);
const MotionHeading = motion(Heading);
const MotionTag = motion(Tag);

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

export default function Cards() {
  const bg = useColorModeValue("gray.50", "gray.900");
  const cardBg = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.800", "gray.100");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const purpleColor = useColorModeValue("purple.600", "purple.400");
  const purpleHover = useColorModeValue("purple.700", "purple.500");
  const buttonBoxShadow = useColorModeValue(
    "0 0 12px rgba(128, 90, 213, 0.7)",
    "0 0 12px rgba(159, 122, 234, 0.7)"
  );

  return (
    <Box
      bg={bg}
      py={{ base: 16, md: 24 }}
      px={{ base: 4, md: 12 }}
      minH="100vh"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <MotionHeading
        as="h1"
        size="xl"
        mb={10}
        textAlign="center"
        color={textColor}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Choose the Right Plan for You
      </MotionHeading>
      <Flex
        direction={{ base: "column", md: "row" }}
        gap={8}
        maxW="6xl"
        mx="auto"
        alignItems="stretch"
        as={motion.div}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {plans.map((plan) => (
          <MotionBox
            key={plan.id}
            flex="1"
            bg={cardBg}
            rounded="2xl"
            shadow="lg"
            p={8}
            border="1px solid"
            borderColor={borderColor}
            position="relative"
            variants={itemVariants}
            whileHover={{
              y: -5,
              transition: { duration: 0.3, ease: "easeInOut" },
            }}
            style={{ boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" }}
          >
            {plan.isPopular && (
              <MotionTag
                size="md"
                variant="solid"
                colorScheme="purple"
                position="absolute"
                top="-4"
                right="4"
                rounded="full"
                py={1}
                px={3}
                variants={itemVariants}
              >
                <TagLabel fontWeight="bold">Most Popular</TagLabel>
              </MotionTag>
            )}
            <MotionVStack
              spacing={4}
              align="center"
              mb={8}
              variants={itemVariants}
            >
              <MotionHeading
                as="h2"
                size="lg"
                color={textColor}
                variants={itemVariants}
              >
                {plan.title}
              </MotionHeading>
              <MotionText
                fontSize="md"
                color="gray.500"
                textAlign="center"
                variants={itemVariants}
              >
                {plan.description}
              </MotionText>
              <MotionText
                fontSize="5xl"
                fontWeight="extrabold"
                color={textColor}
                variants={itemVariants}
              >
                {plan.price}€
                <Text
                  as="span"
                  fontSize="lg"
                  fontWeight="normal"
                  color="gray.500"
                >
                  /month
                </Text>
              </MotionText>
            </MotionVStack>
            <Divider mb={8} />
            <MotionVStack
              spacing={3}
              align="flex-start"
              mb={10}
              variants={itemVariants}
            >
              <List spacing={3}>
                {plan.features.map((feature, index) => (
                  <ListItem
                    key={index}
                    color={textColor}
                    as={motion.li}
                    variants={itemVariants}
                    custom={index}
                  >
                    <ListIcon as={FaCheckCircle} color={purpleColor} />
                    {feature}
                  </ListItem>
                ))}
              </List>
            </MotionVStack>
            <Button
              size="lg"
              width="full"
              bg={"black"}
              borderRadius={20}
              color="white"
              as={motion.button}
              whileHover={{
                scale: 1.02,
                transition: { duration: 0.2 },
              }}
              whileTap={{ scale: 0.98 }}
              _hover={{
                bg: purpleHover,
                boxShadow: buttonBoxShadow,
              }}
              onClick={() => console.log(`Subscribing to ${plan.title}`)}
            >
              {plan.id === "free" ? "Get Started" : "Subscribe Now"}
            </Button>
          </MotionBox>
        ))}
      </Flex>
    </Box>
  );
}
