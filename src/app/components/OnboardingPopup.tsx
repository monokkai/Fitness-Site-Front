"use client";

import { useEffect, useState } from "react";
import { useAuth } from "../shared/context/authContext";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  VStack,
  FormControl,
  FormLabel,
  Select,
  useToast,
} from "@chakra-ui/react";

const OnboardingPopup = () => {
  const { user, isLoading } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const toast = useToast();

  useEffect(() => {
    if (!isLoading && user) {
      const isQualified = localStorage.getItem("isQualified");
      if (!isQualified || isQualified === "false") {
        setIsOpen(true);
      }
    }
  }, [user, isLoading]);

  const handleSubmit = () => {
    localStorage.setItem("isQualified", "true");
    setIsOpen(false);
    toast({
      title: "Welcome to HandFit!",
      description: "Your profile is complete",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={() => {}} closeOnOverlayClick={false}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Complete Your Profile</ModalHeader>
        <ModalBody>
          <VStack spacing={4}>
            <FormControl>
              <FormLabel>Training Goal</FormLabel>
              <Select placeholder="Select your goal">
                <option value="weight_loss">Weight Loss</option>
                <option value="muscle_gain">Muscle Gain</option>
                <option value="endurance">Endurance</option>
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel>Experience Level</FormLabel>
              <Select placeholder="Select your level">
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </Select>
            </FormControl>
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" onClick={handleSubmit}>
            Complete Setup
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default OnboardingPopup;
