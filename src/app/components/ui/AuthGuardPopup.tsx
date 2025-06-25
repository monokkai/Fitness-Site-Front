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

export const AuthGuardPopup = () => {
  const router = useRouter();
  const { isPopupOpen } = useAuthGuardStore();

  const handleSignIn = () => {
    router.push("/auth");
  };

  return (
    <Modal
      isOpen={isPopupOpen}
      onClose={() => {}}
      closeOnOverlayClick={false}
      closeOnEsc={false}
      isCentered
      trapFocus={true}
      blockScrollOnMount={true}
      useInert={true}
    >
      <ModalOverlay
        backdropFilter="blur(7px)"
        onClick={(e) => e.stopPropagation()}
      />
      <ModalContent
        bg="gray"
        color="white"
        borderRadius="30px"
        onMouseDown={(e) => e.stopPropagation()}
      >
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
