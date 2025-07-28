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
  Link,
} from "@chakra-ui/react";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import api from "../../shared/api/axios";
import { AUTH_ENDPOINTS } from "../../shared/config/api.config";

interface AuthResponse {
  token: string;
  user?: {
    id: number;
    username: string;
    email: string;
  };
  message?: string;
}

interface ApiError {
  response?: {
    status: number;
    data: {
      message: string;
    };
  };
  request?: XMLHttpRequest;
  message: string;
}

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
  const bgColor = useColorModeValue("white", "white");
  const borderColor = useColorModeValue("gray.300", "gray.300");
  const textColor = useColorModeValue("black", "black");
  const headingColor = useColorModeValue("black", "black");

  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setError("");

    try {
      const requestData = {
        email: formData.email,
        password: formData.password,
      };

      console.log("Sending login request to:", AUTH_ENDPOINTS.LOGIN);
      console.log("Request data:", {
        email: formData.email,
        passwordLength: formData.password.length,
      });

      const response = await api.post<AuthResponse>(
        AUTH_ENDPOINTS.LOGIN,
        requestData
      );
      console.log(response)
      console.log(response.data)
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        router.push("/");
      } else {
        setError("Invalid response from server - no token received");
      }
    } catch (error) {
      const apiError = error as ApiError;
      console.error("Login error details:", {
        hasResponse: !!apiError.response,
        status: apiError.response?.status,
        message: apiError.message,
        responseData: apiError.response?.data,
      });

      if (apiError.response) {
        setError(apiError.response.data.message || "Authentication failed");
      } else if (apiError.request) {
        setError("No response from server. Please check your connection.");
      } else {
        setError("An error occurred during login");
      }
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
            Sign in to your account to continue your fitness journey
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
        <Stack spacing="6">
          <Stack spacing="5">
            <MotionBox variants={itemVariants}>
              <FormControl>
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
              </FormControl>
            </MotionBox>

            <MotionBox variants={itemVariants}>
              <FormControl>
                <FormLabel htmlFor="password" color={headingColor}>
                  Password
                </FormLabel>
                <InputGroup size="lg">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
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
            <Text color="red.500" textAlign="center">
              {error}
            </Text>
          )}

          <MotionBox variants={itemVariants}>
            <Button
              size="lg"
              colorScheme="brand"
              borderRadius="xl"
              width="100%"
              _hover={{
                bg: "brand.400",
                boxShadow: "0 0 12px rgba(170, 255, 3, 0.7)",
              }}
              onClick={handleSubmit}
            >
              Sign in
            </Button>
          </MotionBox>
        </Stack>

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
        <Link
          as={Link}
          href="/signup"
          color="brand.400"
          _hover={{ color: "brand.500" }}
        >
          Sign up
        </Link>
      </MotionText>
    </MotionStack>
  );
};

export default AuthForm;
