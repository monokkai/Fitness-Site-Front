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
} from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import { DeleteIcon, WarningIcon } from "@chakra-ui/icons";

const MotionModalContent = motion(ModalContent);

interface DeleteAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isLoading: boolean;
}

const DeleteAccountModal: React.FC<DeleteAccountModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  isLoading,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay bg="blackAlpha.600" backdropFilter="blur(10px)" />
      <AnimatePresence>
        {isOpen && (
          <MotionModalContent
            initial={{ opacity: 0, scale: 0.8, y: -50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            mx={4}
          >
            <ModalHeader textAlign="center" color="red.600">
              <Icon as={WarningIcon} mr={2} />
              Confirm Account Deletion
            </ModalHeader>

            <ModalBody>
              <VStack spacing={4} textAlign="center">
                <Text fontSize="lg" fontWeight="medium">
                  Are you sure you want to delete your account?
                </Text>
                <Text color="gray.600" fontSize="sm">
                  This action cannot be undone. All your data will be
                  permanently deleted.
                </Text>
              </VStack>
            </ModalBody>

            <ModalFooter>
              <HStack spacing={3} width="full" justify="center">
                <Button
                  onClick={onClose}
                  variant="outline"
                  flex={1}
                  isDisabled={isLoading}
                >
                  Cancel
                </Button>
                <Button
                  onClick={onConfirm}
                  colorScheme="red"
                  flex={1}
                  isLoading={isLoading}
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
