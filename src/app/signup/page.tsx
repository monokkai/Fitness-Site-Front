"use client";

import { Container } from "@chakra-ui/react";
import SignupForm from "./components/SignupForm";

const SignupPage = () => {
  return (
    <Container maxW="lg" py={{ base: "12", md: "24" }} px={{ base: "0", sm: "8" }}>
      <SignupForm />
    </Container>
  );
};

export default SignupPage;
