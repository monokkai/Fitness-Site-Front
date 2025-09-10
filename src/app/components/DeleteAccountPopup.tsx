"use client";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Text,
  VStack,
  Icon,
  HStack,
  Input,
  FormControl,
  FormLabel,
  InputGroup,
  InputRightElement,
  IconButton,
  useToast,
} from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import {
  DeleteIcon,
  WarningIcon,
  ViewIcon,
  ViewOffIcon,
} from "@chakra-ui/icons";
import { useState } from "react";
import axios from "axios";
import { API_URL } from "../shared/config/api.config";

const MotionModalContent = motion(ModalContent);

interface DeleteAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

const DeleteAccountModal: React.FC<DeleteAccountModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const handleDeleteAccount = async () => {
    if (!password) {
      toast({
        title: "Password required",
        description: "Please enter your password to confirm account deletion",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setIsLoading(true);

    try {
      await axios({
        method: "delete",
        url: `${API_URL}/api/users/account`,
        data: { password },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      toast({
        title: "Account deleted successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      localStorage.removeItem("token");

      if (onSuccess) {
        onSuccess();
      }

      window.location.href = "/";
    } catch (error: any) {
      console.error("Delete account error:", error);

      toast({
        title: "Error deleting account",
        description: error.response?.data?.message || "Please try again",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setPassword("");
    setShowPassword(false);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} isCentered>
      <ModalOverlay bg="blackAlpha.600" backdropFilter="blur(10px)" />
      <AnimatePresence>
        {isOpen && (
          <MotionModalContent
            initial={{ opacity: 0, scale: 0.8, y: -50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            mx={4}
            bg={"white"}
          >
            <ModalHeader textAlign="center" color="red.600">
              <Icon as={WarningIcon} mr={2} />
              Confirm Account Deletion
            </ModalHeader>

            <ModalBody>
              <VStack bg={"white"} spacing={4} textAlign="center">
                <Text fontSize="lg" fontWeight="medium">
                  Are you sure you want to delete your account?
                </Text>
                <Text color="gray.600" fontSize="sm">
                  This action cannot be undone. All your data will be
                  permanently deleted.
                </Text>

                <FormControl>
                  <FormLabel>Enter your password to confirm</FormLabel>
                  <InputGroup>
                    <Input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Your password"
                      isDisabled={isLoading}
                    />
                    <InputRightElement>
                      <IconButton
                        aria-label={
                          showPassword ? "Hide password" : "Show password"
                        }
                        icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowPassword(!showPassword)}
                        isDisabled={isLoading}
                      />
                    </InputRightElement>
                  </InputGroup>
                </FormControl>
              </VStack>
            </ModalBody>

            <ModalFooter>
              <HStack spacing={3} width="full" justify="center">
                <Button
                  onClick={handleClose}
                  variant="outline"
                  flex={1}
                  isDisabled={isLoading}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleDeleteAccount}
                  colorScheme="red"
                  flex={1}
                  isLoading={isLoading}
                  isDisabled={!password}
                  leftIcon={<DeleteIcon />}
                >
                  Delete Account
                </Button>
              </HStack>
            </ModalFooter>
          </MotionModalContent>
        )}
      </AnimatePresence>
    </Modal>
  );
};

export default DeleteAccountModal;
