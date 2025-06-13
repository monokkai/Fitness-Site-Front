import React, { useState } from "react";
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
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { FaGithub, FaGoogle } from "react-icons/fa";

const AuthForm: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const textColor = useColorModeValue("gray.600", "gray.400");
  const headingColor = useColorModeValue("gray.700", "white");
  return (
    <Stack spacing="8">
      <Stack spacing="6">
        <Stack spacing={{ base: "2", md: "3" }} textAlign="center">
          <Heading size={{ base: "xl", md: "2xl" }} color={headingColor}>
            Welcome to HandFit+
          </Heading>
          <Text color={textColor}>
            Sign in to your account to continue your fitness journey
          </Text>
        </Stack>
      </Stack>

      <Box
        py={{ base: "0", sm: "8" }}
        px={{ base: "4", sm: "10" }}
        bg={bgColor}
        boxShadow={{ base: "none", sm: "md" }}
        borderRadius={{ base: "none", sm: "xl" }}
        borderWidth="1px"
        borderColor={borderColor}
      >
        <Stack spacing="6">
          <Stack spacing="5">
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
              />
            </FormControl>

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
          </Stack>

          <Button
            size="lg"
            colorScheme="brand"
            borderRadius="xl"
            _hover={{
              bg: "brand.400",
              boxShadow: "0 0 12px rgba(170, 255, 3, 0.7)",
            }}
          >
            Sign in
          </Button>
        </Stack>

        <Stack spacing="6" mt="8">
          <Stack spacing="3">
            <Flex align="center" gap={4}>
              <Divider flex="1" />
              <Text color={textColor} fontSize="sm" whiteSpace="nowrap">
                OR CONTINUE WITH
              </Text>
              <Divider flex="1" />
            </Flex>
          </Stack>

          <Flex gap="4">
            <Button
              flex="1"
              variant="outline"
              leftIcon={<FaGoogle />}
              size="lg"
              borderRadius="xl"
              _hover={{
                bg: "gray.50",
                borderColor: "brand.400",
              }}
            >
              Google
            </Button>
            <Button
              flex="1"
              variant="outline"
              leftIcon={<FaGithub />}
              size="lg"
              borderRadius="xl"
              _hover={{
                bg: "gray.50",
                borderColor: "brand.400",
              }}
            >
              GitHub
            </Button>
          </Flex>
        </Stack>
      </Box>

      <Text textAlign="center" color={textColor}>
        Don&apos;t have an account?{" "}
        <Link href="/signup">
          <Button
            variant="link"
            color="brand.400"
            _hover={{ color: "brand.500" }}
          >
            Sign up
          </Button>
        </Link>
      </Text>
    </Stack>
  );
};

export default AuthForm;
