"use client";

import {
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  IconButton,
  Text,
  Box,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

interface FormFieldsProps {
  username: string;
  email: string;
  password: string;
  showPassword: boolean;
  errors: {
    username?: string;
    email?: string;
    password?: string;
  };
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  toggleShowPassword: () => void;
  textColor: string;
  errorColor: string;
}

const FormFields: React.FC<FormFieldsProps> = ({
  username,
  email,
  password,
  showPassword,
  errors,
  handleChange,
  toggleShowPassword,
  textColor,
  errorColor,
}) => {
  return (
    <>
      <MotionBox>
        <FormControl isInvalid={!!errors.username}>
          <FormLabel htmlFor="username" color={textColor}>
            Username
          </FormLabel>
          <Input
            id="username"
            type="text"
            placeholder="Enter your username"
            size="lg"
            borderRadius="xl"
            borderColor={"gray.200"}
            _focus={{
              borderColor: "blue.500",
              boxShadow: "0 0 0 1px var(--chakra-colors-blue-500)",
            }}
            value={username}
            onChange={handleChange}
          />
          {errors.username && (
            <Text color={errorColor} fontSize="sm" mt={1}>
              {errors.username}
            </Text>
          )}
        </FormControl>
      </MotionBox>

      <MotionBox>
        <FormControl isInvalid={!!errors.email}>
          <FormLabel htmlFor="email" color={textColor}>
            Email
          </FormLabel>
          <Input
            id="email"
            type="email"
            placeholder="Enter your email"
            size="lg"
            borderRadius="xl"
            borderColor={"gray.200"}
            _focus={{
              borderColor: "blue.500",
              boxShadow: "0 0 0 1px var(--chakra-colors-blue-500)",
            }}
            value={email}
            onChange={handleChange}
          />
          {errors.email && (
            <Text color={errorColor} fontSize="sm" mt={1}>
              {errors.email}
            </Text>
          )}
        </FormControl>
      </MotionBox>

      <MotionBox>
        <FormControl isInvalid={!!errors.password}>
          <FormLabel htmlFor="password" color={textColor}>
            Password
          </FormLabel>
          <InputGroup size="lg">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Create a password"
              borderRadius="xl"
              borderColor={"gray.200"}
              _focus={{
                borderColor: "blue.500",
                boxShadow: "0 0 0 1px var(--chakra-colors-blue-500)",
              }}
              value={password}
              onChange={handleChange}
            />
            <InputRightElement>
              <IconButton
                variant="ghost"
                aria-label={showPassword ? "Hide password" : "Show password"}
                icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                onClick={toggleShowPassword}
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
    </>
  );
};

export default FormFields;
