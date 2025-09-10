"use client";

import { useState, useRef, useEffect } from "react";
import { useUserStore } from "../shared/store/useUserStore";
import ProfileData from "../shared/interfaces/IProfileData";
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
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  useToast,
  Avatar,
  Input,
  HStack,
  Text,
  Box,
} from "@chakra-ui/react";
import axios from "axios";
import { TRAINING_URL, API_URL } from "../shared/config/api.config";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const OnboardingPopup = ({ isOpen, onClose }: Props) => {
  const { user, setProfile } = useUserStore();
  const toast = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [formData, setFormData] = useState<ProfileData | null>(null);

  useEffect(() => {
    if (isOpen && user) {
      setFormData({
        id: 0,
        userId: user.id,
        age: 0,
        weight: 0,
        height: 0,
        sex: "",
        trainingGoal: "",
        workoutsPerWeek: 3,
        currentStreak: 0,
        longestStreak: 0,
        totalWorkouts: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        goal: "",
      });
      setAvatarFile(null);
      setAvatarPreview(null);
    }
  }, [isOpen, user]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (formData) setFormData({ ...formData, [name]: value } as ProfileData);
  };

  const handleNumberChange = (name: keyof ProfileData, value: string) => {
    if (formData)
      setFormData({ ...formData, [name]: Number(value) } as ProfileData);
  };

  const handleAvatarClick = () => fileInputRef.current?.click();

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarFile(file);
      const reader = new FileReader();
      reader.onload = () => setAvatarPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    if (!user || !formData) return;

    try {
      if (avatarFile) {
        const form = new FormData();
        form.append("avatar", avatarFile);
        await axios.post(`${API_URL}/api/users/avatar/upload`, form, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
      }

      const payload: any = {
        ...formData,
        userId: user.id,
        age: formData.age || 0,
        weight: formData.weight || 0,
        height: formData.height || 0,
        sex: formData.sex || "",
        trainingGoal: formData.trainingGoal || "",
        goal: formData.trainingGoal || "Not Set",
        workoutsPerWeek: formData.workoutsPerWeek || 3,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      const res = await axios.post<ProfileData>(
        `${TRAINING_URL}/user-profiles`,
        payload
      );

      setProfile(res.data);

      const userStore = useUserStore.getState();
      if (userStore.user) {
        userStore.setUser({ ...userStore.user, hasProfile: true });
      }

      localStorage.setItem("hasProfile", "true");
      onClose();
      toast({ title: "Profile created successfully", status: "success" });
    } catch (err: any) {
      toast({
        title: "Error creating profile",
        status: "error",
        description: err.response?.data?.message || "Please try again",
      });
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      closeOnOverlayClick={false}
      size="xl"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Complete Your Profile</ModalHeader>
        <ModalBody>
          {formData ? (
            <VStack spacing={4}>
              <FormControl>
                <FormLabel>Profile Picture</FormLabel>
                <HStack spacing={4}>
                  <Box position="relative">
                    <Avatar
                      size="xl"
                      name={user?.username}
                      src={avatarPreview || undefined}
                      cursor="pointer"
                      onClick={handleAvatarClick}
                      _hover={{ opacity: 0.8 }}
                      bg="gray.200"
                    />
                    <Input
                      ref={fileInputRef}
                      type="file"
                      display="none"
                      accept="image/*"
                      onChange={handleAvatarChange}
                    />
                  </Box>
                  <Box>
                    <Text fontSize="sm" color="gray.600">
                      Click on the avatar to upload a photo
                    </Text>
                    <Text fontSize="xs" color="gray.500">
                      JPG, PNG, GIF (max 5MB)
                    </Text>
                  </Box>
                </HStack>
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Age</FormLabel>
                <NumberInput
                  min={12}
                  max={120}
                  value={formData.age}
                  onChange={(v) => handleNumberChange("age", v)}
                >
                  <NumberInputField name="age" />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Weight (kg)</FormLabel>
                <NumberInput
                  min={30}
                  max={300}
                  value={formData.weight}
                  onChange={(v) => handleNumberChange("weight", v)}
                >
                  <NumberInputField name="weight" />
                </NumberInput>
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Height (cm)</FormLabel>
                <NumberInput
                  min={100}
                  max={250}
                  value={formData.height}
                  onChange={(v) => handleNumberChange("height", v)}
                >
                  <NumberInputField name="height" />
                </NumberInput>
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Sex</FormLabel>
                <Select name="sex" value={formData.sex} onChange={handleChange}>
                  <option value="">Select sex</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </Select>
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Training Goal</FormLabel>
                <Select
                  name="trainingGoal"
                  value={formData.trainingGoal}
                  onChange={handleChange}
                >
                  <option value="">Select goal</option>
                  <option value="WeightGain">Weight Gain</option>
                  <option value="WeightLoss">Weight Loss</option>
                  <option value="Cardio">Cardio</option>
                </Select>
              </FormControl>

              <FormControl isRequired>
                <FormLabel>
                  Workouts per Week: {formData.workoutsPerWeek}
                </FormLabel>
                <Slider
                  min={1}
                  max={20}
                  value={formData.workoutsPerWeek}
                  onChange={(v) =>
                    setFormData({ ...formData, workoutsPerWeek: v })
                  }
                >
                  <SliderTrack>
                    <SliderFilledTrack />
                  </SliderTrack>
                  <SliderThumb />
                </Slider>
              </FormControl>
            </VStack>
          ) : (
            <Text>Loading...</Text>
          )}
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme="blue"
            onClick={handleSubmit}
            isDisabled={!formData}
          >
            Complete Profile
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default OnboardingPopup;
