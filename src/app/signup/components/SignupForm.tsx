"use client";

import {
  Box,
  Button,
  Flex,
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
} from "@chakra-ui/react";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import Link from "next/link";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { AUTH_ENDPOINTS } from "../../shared/config/api.config";
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

const SignupForm: React.FC = () => {
  const { checkAuth } = useAuth();
  const bgColor = useColorModeValue("white", "white");
  const borderColor = useColorModeValue("gray.300", "gray.300");
  const textColor = useColorModeValue("black", "black");
  const headingColor = useColorModeValue("black", "black");
  const errorColor = useColorModeValue("red.500", "red.300");

  const router = useRouter();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<{
    username?: string;
    email?: string;
    password?: string;
  }>({});
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors: typeof errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.username || formData.username.length < 3) {
      newErrors.username = "Username must be at least 3 characters";
    }
    if (!formData.email || !emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!formData.password || formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));

    if (errors[id as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [id]: undefined }));
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!validateForm() || isSubmitting) return;

    setIsSubmitting(true);
    setErrors({});

    try {
      const response = await fetch(AUTH_ENDPOINTS.SIGNUP, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.errors) {
          const serverErrors: typeof errors = {};
          Object.entries(data.errors).forEach(([field, messages]) => {
            if (Array.isArray(messages)) {
              serverErrors[field as keyof typeof errors] = messages[0];
            }
          });
          setErrors(serverErrors);
        } else {
          throw new Error(data.message || "Registration failed");
        }
        return;
      }

      await checkAuth();

      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Registration error:", error);
      setErrors({
        username:
          error instanceof Error ? error.message : "Registration failed",
      });
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
            Create Your Account
          </Heading>
          <Text color={textColor}>
            Join HandFit to start your fitness journey
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
                <FormControl isInvalid={!!errors.username}>
                  <FormLabel htmlFor="username" color={headingColor}>
                    Username
                  </FormLabel>
                  <Input
                    id="username"
                    type="text"
                    placeholder="Enter your username"
                    size="lg"
                    borderRadius="xl"
                    _focus={{
                      borderColor: "brand.400",
                      boxShadow: "0 0 0 1px var(--chakra-colors-brand-400)",
                    }}
                    value={formData.username}
                    onChange={handleChange}
                  />
                  {errors.username && (
                    <Text color={errorColor} fontSize="sm" mt={1}>
                      {errors.username}
                    </Text>
                  )}
                </FormControl>
              </MotionBox>

              <MotionBox variants={itemVariants}>
                <FormControl isInvalid={!!errors.email}>
                  <FormLabel htmlFor="email" color={headingColor}>
                    Email
                  </FormLabel>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    size="lg"
                    borderRadius="xl"
                    _focus={{
                      borderColor: "brand.400",
                      boxShadow: "0 0 0 1px var(--chakra-colors-brand-400)",
                    }}
                    value={formData.email}
                    onChange={handleChange}
                  />
                  {errors.email && (
                    <Text color={errorColor} fontSize="sm" mt={1}>
                      {errors.email}
                    </Text>
                  )}
                </FormControl>
              </MotionBox>

              <MotionBox variants={itemVariants}>
                <FormControl isInvalid={!!errors.password}>
                  <FormLabel htmlFor="password" color={headingColor}>
                    Password
                  </FormLabel>
                  <InputGroup size="lg">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a password"
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
                  {errors.password && (
                    <Text color={errorColor} fontSize="sm" mt={1}>
                      {errors.password}
                    </Text>
                  )}
                </FormControl>
              </MotionBox>
            </Stack>

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
                loadingText="Creating account..."
              >
                Create Account
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
        Already have an account?{" "}
        <Link href="/auth" passHref>
          <Button
            variant="link"
            color="brand.400"
            _hover={{ color: "brand.500" }}
          >
            Sign in
          </Button>
        </Link>
      </MotionText>
    </MotionStack>
  );
};

export default SignupForm;
