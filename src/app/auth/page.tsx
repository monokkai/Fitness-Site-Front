"use client";

import { Container } from "@chakra-ui/react";
import AuthForm from "./components/AuthForm";

const AuthPage: React.FC = () => {
  return (
    <Container
      maxW="lg"
      py={{ base: "12", md: "24" }}
      px={{ base: "0", sm: "8" }}
      color={"black"}
    >
      <AuthForm />
    </Container>
  );
};

export default AuthPage;
