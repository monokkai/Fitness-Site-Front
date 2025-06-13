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
  Container,
} from "@chakra-ui/react";
import { FaCheckCircle } from "react-icons/fa";
import { motion, Variants } from "framer-motion";
import plans from "../utils/plans";

const MotionBox = motion(Box);
const MotionVStack = motion(VStack);
const MotionText = motion(Text);
const MotionHeading = motion(Heading);
const MotionTag = motion(Tag);
const MotionFlex = motion(Flex);

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
  const bg = useColorModeValue("gray.900", "gray.900");
  const cardBg = useColorModeValue(
    "rgba(255, 255, 255, 0.05)",
    "rgba(255, 255, 255, 0.05)"
  );
  const textColor = useColorModeValue("white", "white");
  const borderColor = useColorModeValue(
    "rgba(255, 255, 255, 0.1)",
    "rgba(255, 255, 255, 0.1)"
  );
  const accentColor = useColorModeValue("brand.300", "brand.300");
  const accentHover = useColorModeValue("brand.400", "brand.400");

  return (
    <Box
      bg={bg}
      minH="100vh"
      position="relative"
      overflow="hidden"
      py={{ base: 16, md: 24 }}
      px={{ base: 4, md: 12 }}
    >
      <Box
        position="absolute"
        top="0"
        left="0"
        right="0"
        bottom="0"
        overflow="hidden"
        zIndex="0"
      >
        <Box
          position="absolute"
          top="10%"
          left="10%"
          w="300px"
          h="300px"
          borderRadius="full"
          bg="brand.300"
          opacity="0.1"
          filter="blur(60px)"
          animation="float 8s ease-in-out infinite"
        />
        <Box
          position="absolute"
          bottom="10%"
          right="10%"
          w="400px"
          h="400px"
          borderRadius="full"
          bg="brand.400"
          opacity="0.1"
          filter="blur(60px)"
          animation="float 12s ease-in-out infinite"
        />
      </Box>

      <Container maxW="7xl" position="relative" zIndex="1">
        <MotionVStack spacing={16}>
          <MotionVStack
            spacing={6}
            textAlign="center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <MotionHeading
              as="h1"
              mt={10}
              size="2xl"
              bgGradient="linear(to-r, brand.300, brand.400)"
              bgClip="text"
              fontWeight="extrabold"
            >
              Choose Your Path
            </MotionHeading>
            <MotionText fontSize="xl" color="gray.400" maxW="2xl">
              Unlock your potential with our cutting-edge fitness solutions
            </MotionText>
          </MotionVStack>

          <MotionFlex
            direction={{ base: "column", md: "row" }}
            gap={8}
            maxW="6xl"
            mx="auto"
            alignItems="stretch"
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
                p={8}
                border="1px solid"
                borderColor={borderColor}
                position="relative"
                variants={itemVariants}
                whileHover={{
                  y: -5,
                  transition: { duration: 0.3, ease: "easeInOut" },
                }}
                backdropFilter="blur(10px)"
                _before={{
                  content: '""',
                  position: "absolute",
                  inset: "-1px",
                  borderRadius: "2xl",
                  padding: "1px",
                  background: "linear-gradient(45deg, brand.300, brand.400)",
                  WebkitMask:
                    "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                  WebkitMaskComposite: "xor",
                  maskComposite: "exclude",
                }}
              >
                {plan.isPopular && (
                  <MotionTag
                    size="md"
                    variant="solid"
                    bg="brand.300"
                    color="black"
                    position="absolute"
                    top="-4"
                    right="4"
                    rounded="full"
                    py={1}
                    px={3}
                    variants={itemVariants}
                    boxShadow="0 0 20px rgba(170, 255, 3, 0.3)"
                  >
                    <TagLabel fontWeight="bold">Most Popular</TagLabel>
                  </MotionTag>
                )}
                <MotionVStack
                  spacing={6}
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
                    color="gray.400"
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
                      color="gray.400"
                    >
                      /month
                    </Text>
                  </MotionText>
                </MotionVStack>
                <Divider borderColor="rgba(255, 255, 255, 0.1)" mb={8} />
                <MotionVStack
                  spacing={4}
                  align="flex-start"
                  mb={10}
                  variants={itemVariants}
                >
                  <List spacing={4}>
                    {plan.features.map((feature, index) => (
                      <ListItem
                        key={index}
                        color="gray.300"
                        as={motion.li}
                        variants={itemVariants}
                        custom={index}
                        display="flex"
                        alignItems="center"
                        gap={2}
                      >
                        <ListIcon as={FaCheckCircle} color={accentColor} />
                        {feature}
                      </ListItem>
                    ))}
                  </List>
                </MotionVStack>
                <Button
                  size="lg"
                  width="full"
                  bg={accentColor}
                  color="black"
                  borderRadius={20}
                  as={motion.button}
                  whileHover={{
                    scale: 1.02,
                    transition: { duration: 0.2 },
                  }}
                  whileTap={{ scale: 0.98 }}
                  _hover={{
                    bg: accentHover,
                    boxShadow: "0 0 20px rgba(170, 255, 3, 0.3)",
                  }}
                  onClick={() => console.log(`Subscribing to ${plan.title}`)}
                >
                  {plan.id === "free" ? "Get Started" : "Subscribe Now"}
                </Button>
              </MotionBox>
            ))}
          </MotionFlex>
        </MotionVStack>
      </Container>
    </Box>
  );
}
