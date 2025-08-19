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
} from "@chakra-ui/react";
import axios from "axios";
import { TRAINING_URL } from "../shared/config/api.config";

interface UserProfileData {
  age: number;
  weight: number;
  height: number;
  sex: string;
  trainingGoal: string;
  workoutsPerWeek: number;
  userId: number;
}

const OnboardingPopup = () => {
  const { user } = useAuth();
  const toast = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [profileCreated, setProfileCreated] = useState(false);

  const [formData, setFormData] = useState<UserProfileData>({
    age: 0,
    weight: 0,
    height: 0,
    sex: "",
    trainingGoal: "",
    workoutsPerWeek: 3,
    userId: user?.id || 0,
  });

  useEffect(() => {
    if (user?.id) {
      axios
        .get(`${TRAINING_URL}/user-profiles/${user.id}`)
        .then(() => {
          setProfileCreated(true);
        })
        .catch(() => {
          setIsOpen(true);
          setFormData((prev) => ({ ...prev, userId: user.id }));
        });
    }
  }, [user]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNumberChange = (name: keyof UserProfileData, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: Number(value) }));
  };

  const handleSubmit = async () => {
    if (!user?.id) return;

    setIsLoading(true);
    try {
      const payload = {
        userId: user.id,
        age: Number(formData.age),
        weight: Number(formData.weight),
        height: Number(formData.height),
        sex: formData.sex,
        trainingGoal: formData.trainingGoal,
        workoutsPerWeek: formData.workoutsPerWeek,
        currentStreak: 0,
        longestStreak: 0,
        totalWorkouts: 0,
      };

      const response = await axios.post(
        `${TRAINING_URL}/user-profiles`,
        payload,
      );

      if (response.status === 200 || response.status === 201) {
        localStorage.setItem("isQualified", "true");
        setIsOpen(false);
        setProfileCreated(true);
        toast({
          title: "Profile updated successfully",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        window.location.reload();
      }
    } catch (error: any) {
      console.error("Error updating profile:", error);
      toast({
        title: "Error updating profile",
        description:
          error.response?.data?.message ||
          "Please check your data and try again",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen || profileCreated) return null;

  return (
    <Modal isOpen={isOpen} onClose={() => {}} closeOnOverlayClick={false}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Complete Your Profile</ModalHeader>
        <ModalBody>
          <VStack spacing={4}>
            <FormControl isRequired>
              <FormLabel>Age</FormLabel>
              <NumberInput
                min={12}
                max={120}
                value={formData.age}
                onChange={(value) => handleNumberChange("age", value)}
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
                onChange={(value) => handleNumberChange("weight", value)}
              >
                <NumberInputField name="weight" />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Height (sm)</FormLabel>
              <NumberInput
                min={100}
                max={250}
                value={formData.height}
                onChange={(value) => handleNumberChange("height", value)}
              >
                <NumberInputField name="height" />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Sex</FormLabel>
              <Select
                name="sex"
                value={formData.sex}
                onChange={handleChange}
                placeholder="Select sex"
              >
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
                placeholder="Select goal"
              >
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
                onChange={(value) =>
                  setFormData((prev) => ({ ...prev, workoutsPerWeek: value }))
                }
              >
                <SliderTrack>
                  <SliderFilledTrack />
                </SliderTrack>
                <SliderThumb />
              </Slider>
            </FormControl>
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme="blue"
            isLoading={isLoading}
            onClick={handleSubmit}
            isDisabled={
              !formData.age ||
              !formData.weight ||
              !formData.height ||
              !formData.sex ||
              !formData.trainingGoal
            }
          >
            Complete Profile
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default OnboardingPopup;
