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
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useAuthGuardStore } from "@/app/shared/store/authGuardStore";

const AuthPopup = () => {
  const router = useRouter();
  const { isPopupOpen, closePopup } = useAuthGuardStore();

  const handleSignIn = () => {
    router.push("/auth");
    closePopup();
  };

  return (
    <Modal isOpen={isPopupOpen} onClose={closePopup} isCentered>
      <ModalOverlay backdropFilter="blur(4px)" />
      <ModalContent bg="gray.900" color="white">
        <ModalHeader textAlign="center">Access Restricted</ModalHeader>
        <ModalBody>
          <VStack spacing={4}>
            <Text fontSize="xl" textAlign="center">
              Oops! You are not authorized!
            </Text>
            <Text fontSize="md" color="gray.400" textAlign="center">
              Please sign in to access training content
            </Text>
          </VStack>
        </ModalBody>
        <ModalFooter justifyContent="center" pb={6}>
          <Button
            colorScheme="blue"
            size="lg"
            borderRadius="30px"
            px={8}
            onClick={handleSignIn}
            _hover={{ transform: "scale(1.05)" }}
            transition="all 0.2s"
          >
            Sign In
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AuthPopup;
