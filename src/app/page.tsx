"use client";

import { Box, Button, useDisclosure, Text } from "@chakra-ui/react";
import Hero from "./components/layout/Hero";
import DemoSection from "./components/DemoSection";
import FAQSection from "./components/FAQSection";
import OnboardingPopup from "./components/OnboardingPopup";
import { useState, useEffect } from "react";
import { useUserStore } from "./shared/store/useUserStore";

export default function Home() {
  const [isClient, setIsClient] = useState(false);
  const fetchUser = useUserStore((state) => state.fetchUser);
  const user = useUserStore((state) => state.user);
  const hasProfile = useUserStore((state) => state.hasProfile);
  const [showPopup, setShowPopup] = useState(false);

  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    console.log("User:", user);
    console.log("Has profile:", hasProfile);
    console.log("LocalStorage hasProfile:", localStorage.getItem("hasProfile"));
  }, [user, hasProfile]);

  useEffect(() => {
    setIsClient(true);
    fetchUser();
  }, [fetchUser]);

  useEffect(() => {
    if (user && !hasProfile) {
      console.log("New user detected, opening popup");
      const timer = setTimeout(() => {
        onOpen();
        setShowPopup(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [user, hasProfile, onOpen]);

  const shouldShowButton = user && !hasProfile && !showPopup;

  if (!isClient) return null;

  return (
    <Box bg="white" position="relative" minH="100vh">
      <Hero />
      <DemoSection />
      <FAQSection />

      {user && (
        <Box
          position="fixed"
          top="5rem"
          right="1rem"
          zIndex={9999}
          bg="white"
          p={3}
          borderRadius="md"
          boxShadow="md"
        >
          <Text fontSize="sm">User: {user.username}</Text>
          <Text fontSize="sm">HasProfile: {hasProfile ? "Yes" : "No"}</Text>
          <Text fontSize="sm">
            ShowButton: {shouldShowButton ? "Yes" : "No"}
          </Text>
        </Box>
      )}

      {shouldShowButton && (
        <Button
          position="fixed"
          top="1rem"
          right="1rem"
          zIndex={9999}
          colorScheme="blue"
          onClick={onOpen}
          boxShadow="lg"
          _hover={{ transform: "scale(1.05)", boxShadow: "xl" }}
        >
          Fill Your Profile
        </Button>
      )}

      {user && !hasProfile && (
        <OnboardingPopup isOpen={isOpen} onClose={onClose} />
      )}
    </Box>
  );
}
