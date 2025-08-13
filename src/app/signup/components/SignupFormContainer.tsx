"use client";

import { Box, Stack, useColorModeValue } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useSignupStore } from "../../shared/store/authStore";
import { AUTH_ENDPOINTS } from "@/app/shared/config/api.config";
import { useAuth } from "@/app/shared/context/authContext";
import { useRouter } from "next/navigation";
import FormFields from "./FormFields";
import PrivacyCheckbox from "./PrivacyCheckbox";
import SubmitButton from "./SubmitButton";
import SocialLoginSection from "./SocialLoginSection";

const MotionBox = motion(Box);

const SignupFormContainer = () => {
  const {
    username,
    email,
    password,
    showPassword,
    errors,
    isSubmitting,
    setFormData,
    setErrors,
    toggleShowPassword,
    setIsSubmitting,
  } = useSignupStore();

  const { checkAuth } = useAuth();
  const router = useRouter();

  const bgColor = useColorModeValue("white", "white");
  const borderColor = useColorModeValue("gray.200", "gray.300");
  const textColor = useColorModeValue("gray.800", "black");
  const errorColor = useColorModeValue("red.500", "red.300");

  const validateForm = () => {
    const newErrors: typeof errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!username || username.length < 3)
      newErrors.username = "Username must be at least 3 characters";
    if (!email || !emailRegex.test(email))
      newErrors.email = "Please enter a valid email address";
    if (!password || password.length < 6)
      newErrors.password = "Password must be at least 6 characters";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setFormData({ [id]: value });
    if (errors[id as keyof typeof errors])
      setErrors({ ...errors, [id]: undefined });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!validateForm() || isSubmitting) return;

    setIsSubmitting(true);
    setErrors({});

    try {
      const response = await fetch(AUTH_ENDPOINTS.SIGNUP, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.errors) {
          const serverErrors: typeof errors = {};
          Object.entries(data.errors).forEach(([field, messages]) => {
            if (Array.isArray(messages))
              serverErrors[field as keyof typeof errors] = messages[0];
          });
          setErrors(serverErrors);
        } else throw new Error(data.message || "Registration failed");
        return;
      }

      await checkAuth();
      router.push("/");
      router.refresh();
    } catch (error) {
      setErrors({
        username:
          error instanceof Error ? error.message : "Registration failed",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <MotionBox
      py={{ base: "6", sm: "8" }}
      px={{ base: "6", sm: "10" }}
      bg={bgColor}
      boxShadow="lg"
      borderRadius="xl"
      borderWidth="1px"
      borderColor={borderColor}
    >
      <form onSubmit={handleSubmit}>
        <Stack spacing="6">
          <Stack spacing="5">
            <FormFields
              username={username}
              email={email}
              password={password}
              showPassword={showPassword}
              errors={errors}
              handleChange={handleChange}
              toggleShowPassword={toggleShowPassword}
              textColor={textColor}
              errorColor={errorColor}
            />
          </Stack>

          <PrivacyCheckbox />

          <SubmitButton isSubmitting={isSubmitting} />
        </Stack>
      </form>

      <SocialLoginSection textColor={textColor} />
    </MotionBox>
  );
};

export default SignupFormContainer;
