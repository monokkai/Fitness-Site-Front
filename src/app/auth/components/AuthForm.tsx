"use client";

import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Text,
  useColorModeValue,
  Divider,
  InputGroup,
  InputRightElement,
  IconButton,
  Flex,
} from "@chakra-ui/react";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useAuth } from "../../shared/context/authContext";

const MotionBox = motion(Box);
const MotionStack = motion(Stack);
const MotionText = motion(Text);

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
};

const AuthForm: React.FC = () => {
  const { login } = useAuth();
  const bgColor = useColorModeValue("white", "white");
  const borderColor = useColorModeValue("gray.300", "gray.300");
  const textColor = useColorModeValue("black", "black");
  const headingColor = useColorModeValue("black", "black");
  const errorColor = useColorModeValue("red.500", "red.300");

  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
    // Clear error when user starts typing
    if (error) setError("");
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (isSubmitting) return;

    // Basic validation
    if (!formData.email || !formData.password) {
      setError("Please fill in all fields");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      await login(formData.email, formData.password);
      router.push("/");
      router.refresh();
    } catch (err) {
      console.error("Login error:", err);
      setError(
        err instanceof Error ? err.message : "Login failed. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <MotionStack
      spacing="8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <MotionStack spacing="6" variants={itemVariants}>
        <Stack spacing={{ base: "2", md: "3" }} textAlign="center">
          <Heading size={{ base: "xl", md: "2xl" }} color={headingColor}>
            Welcome to HandFit
          </Heading>
          <Text color={textColor}>
            Sign in to continue your fitness journey
          </Text>
        </Stack>
      </MotionStack>

      <MotionBox
        variants={itemVariants}
        py={{ base: "6", sm: "8" }}
        px={{ base: "6", sm: "10" }}
        bg={bgColor}
        boxShadow="none"
        borderRadius="xl"
        borderWidth="1px"
        borderColor={borderColor}
      >
        <form onSubmit={handleSubmit}>
          <Stack spacing="6">
            <Stack spacing="5">
              <MotionBox variants={itemVariants}>
                <FormControl isInvalid={!!error}>
                  <FormLabel htmlFor="email" color={headingColor}>
                    Email
                  </FormLabel>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    size="lg"
                    borderRadius="xl"
                    _focus={{
                      borderColor: "brand.400",
                      boxShadow: "0 0 0 1px var(--chakra-colors-brand-400)",
                    }}
                    value={formData.email}
                    onChange={handleChange}
                  />
                </FormControl>
              </MotionBox>

              <MotionBox variants={itemVariants}>
                <FormControl isInvalid={!!error}>
                  <FormLabel htmlFor="password" color={headingColor}>
                    Password
                  </FormLabel>
                  <InputGroup size="lg">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      borderRadius="xl"
                      _focus={{
                        borderColor: "brand.400",
                        boxShadow: "0 0 0 1px var(--chakra-colors-brand-400)",
                      }}
                      value={formData.password}
                      onChange={handleChange}
                    />
                    <InputRightElement>
                      <IconButton
                        variant="ghost"
                        aria-label={
                          showPassword ? "Hide password" : "Show password"
                        }
                        icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                        onClick={() => setShowPassword(!showPassword)}
                      />
                    </InputRightElement>
                  </InputGroup>
                </FormControl>
              </MotionBox>
            </Stack>

            {error && (
              <Text color={errorColor} textAlign="center" fontSize="sm">
                {error}
              </Text>
            )}

            <MotionBox variants={itemVariants}>
              <Button
                type="submit"
                size="lg"
                colorScheme="brand"
                borderRadius="xl"
                width="100%"
                _hover={{
                  bg: "brand.400",
                  boxShadow: "0 0 12px rgba(170, 255, 3, 0.7)",
                }}
                isLoading={isSubmitting}
                loadingText="Signing in..."
              >
                Sign In
              </Button>
            </MotionBox>
          </Stack>
        </form>

        <Stack spacing="6" mt="8">
          <Stack spacing="3">
            <Flex align="center" gap={4}>
              <Divider flex="1" />
              <Text color="black" fontSize="sm" whiteSpace="nowrap">
                OR CONTINUE WITH
              </Text>
              <Divider flex="1" />
            </Flex>
          </Stack>

          <Flex gap="4">
            <MotionBox
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              flex="1"
            >
              <Button
                w="full"
                variant="outline"
                leftIcon={<FaGoogle />}
                size="lg"
                borderRadius="xl"
                color="black"
                _hover={{
                  bg: "gray.50",
                  borderColor: "brand.400",
                }}
              >
                Google
              </Button>
            </MotionBox>
            <MotionBox
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              flex="1"
            >
              <Button
                w="full"
                variant="outline"
                leftIcon={<FaGithub />}
                size="lg"
                borderRadius="xl"
                color="black"
                _hover={{
                  bg: "gray.50",
                  borderColor: "brand.400",
                }}
              >
                GitHub
              </Button>
            </MotionBox>
          </Flex>
        </Stack>
      </MotionBox>

      <MotionText
        textAlign="center"
        color="black"
        variants={itemVariants}
        whileHover={{ scale: 1.02 }}
      >
        Don&apos;t have an account?{" "}
        <Button
          as="a"
          href="/signup"
          variant="link"
          color="brand.400"
          _hover={{ color: "brand.500" }}
        >
          Sign up
        </Button>
      </MotionText>
    </MotionStack>
  );
};

export default AuthForm;
