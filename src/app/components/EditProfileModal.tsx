"use client";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  VStack,
  HStack,
  FormControl,
  FormLabel,
  Input,
  Avatar,
  IconButton,
  Box,
  InputGroup,
  InputRightElement,
  useToast,
} from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import { EditIcon, ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useState, useRef } from "react";
import axios from "axios";
import { API_URL } from "../shared/config/api.config";

const MotionModalContent = motion(ModalContent);

interface User {
  id: number;
  username: string;
  email: string;
  avatarUrl?: string;
}

interface UpdateProfileResponse {
  message: string;
  user?: User;
  avatarUrl?: string;
}

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User;
  onUpdate: (updatedUser: Partial<User>) => void;
}

const EditProfileModal: React.FC<EditProfileModalProps> = ({
  isOpen,
  onClose,
  user,
  onUpdate,
}) => {
  const [formData, setFormData] = useState({
    username: user.username,
    email: user.email,
    password: "",
    confirmPassword: "",
  });
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState(user.avatarUrl || "");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const toast = useToast();

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setAvatarPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = async () => {
    setIsLoading(true);

    if (formData.password && formData.password !== formData.confirmPassword) {
      toast({
        title: "Passwords don't match",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      setIsLoading(false);
      return;
    }

    try {
      let newAvatarUrl = user.avatarUrl;
      if (avatarFile) {
        const avatarFormData = new FormData();
        avatarFormData.append("avatar", avatarFile);

        const response = await axios.post<{ avatarUrl: string }>(
          "/api/upload-avatar",
          avatarFormData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        newAvatarUrl = response.data.avatarUrl;
      }

      const updateData: any = {
        username: formData.username,
        email: formData.email,
        ...(newAvatarUrl && { avatarUrl: newAvatarUrl }),
        ...(formData.password && { password: formData.password }),
      };

      const response = await axios.put<UpdateProfileResponse>(
        `${API_URL}/api/users/profile`,
        updateData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      onUpdate(response.data.user || response.data);
      onClose();

      toast({
        title: "Profile updated successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error: any) {
      toast({
        title: "Error updating profile",
        description: error.response?.data?.message || "Please try again",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size="lg">
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
            <ModalHeader textAlign="center">Edit Profile</ModalHeader>

            <ModalBody>
              <VStack bg={"white"} spacing={6}>
                <FormControl textAlign="center">
                  <FormLabel>Profile Picture</FormLabel>
                  <Box position="relative" display="inline-block">
                    <Avatar
                      size="xl"
                      name={formData.username}
                      src={avatarPreview || user.avatarUrl}
                      cursor="pointer"
                      onClick={handleAvatarClick}
                    />
                    <IconButton
                      aria-label="Change avatar"
                      icon={<EditIcon />}
                      size="sm"
                      position="absolute"
                      bottom={0}
                      right={0}
                      borderRadius="full"
                      onClick={handleAvatarClick}
                    />
                    <Input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleAvatarChange}
                      display="none"
                    />
                  </Box>
                </FormControl>

                <FormControl>
                  <FormLabel>Username</FormLabel>
                  <Input
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    placeholder="Enter your username"
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Email</FormLabel>
                  <Input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email"
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>New Password</FormLabel>
                  <InputGroup>
                    <Input
                      name="password"
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder="Enter new password"
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
                      />
                    </InputRightElement>
                  </InputGroup>
                </FormControl>

                <FormControl>
                  <FormLabel>Confirm Password</FormLabel>
                  <InputGroup>
                    <Input
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      placeholder="Confirm new password"
                    />
                    <InputRightElement>
                      <IconButton
                        aria-label={
                          showConfirmPassword
                            ? "Hide password"
                            : "Show password"
                        }
                        icon={
                          showConfirmPassword ? <ViewOffIcon /> : <ViewIcon />
                        }
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                      />
                    </InputRightElement>
                  </InputGroup>
                </FormControl>
              </VStack>
            </ModalBody>

            <ModalFooter>
              <HStack spacing={3} width="full">
                <Button
                  onClick={onClose}
                  variant="outline"
                  flex={1}
                  isDisabled={isLoading}
                >
                  Cancel
                </Button>
                <Button
                  colorScheme="blue"
                  flex={1}
                  isLoading={isLoading}
                  onClick={handleSubmit}
                >
                  Save Changes
                </Button>
              </HStack>
            </ModalFooter>
          </MotionModalContent>
        )}
      </AnimatePresence>
    </Modal>
  );
};

export default EditProfileModal;
