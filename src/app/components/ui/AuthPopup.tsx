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

interface AuthPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: () => void;
  message: string;
}

export default function AuthPopup({ isOpen, onClose, onLogin, message }: AuthPopupProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
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
              {message}
            </Text>
          </VStack>
        </ModalBody>
        <ModalFooter justifyContent="center" pb={6}>
          <Button
            colorScheme="blue"
            size="lg"
            borderRadius="30px"
            px={8}
            onClick={onLogin}
            _hover={{ transform: "scale(1.05)" }}
            transition="all 0.2s"
          >
            Sign In
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
