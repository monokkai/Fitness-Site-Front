"use client";

import { Center, Alert, AlertIcon, Text } from "@chakra-ui/react";

interface ErrorAlertProps {
  message: string;
}

export const ErrorAlert: React.FC<ErrorAlertProps> = ({ message }) => (
  <Center minH="100vh">
    <Alert status="error" borderRadius="lg" maxW="md">
      <AlertIcon />
      <Text>{message}</Text>
    </Alert>
  </Center>
);
