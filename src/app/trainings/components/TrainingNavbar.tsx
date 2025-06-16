"use client";

import {
  Box,
  Container,
  HStack,
  IconButton,
  Text,
  useBreakpointValue,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { FaBars } from "react-icons/fa";
import { motion } from "framer-motion";
import Link from "next/link";
import NavContent from "./NavContent";

const MotionBox = motion(Box);

const TrainingNavbar: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <Box
      as="nav"
      bg="white"
      boxShadow="sm"
      position="fixed"
      top={0}
      left={0}
      right={0}
      zIndex={1000}
    >
      <Container maxW="container.xl">
        <MotionBox
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <HStack h="64px" justify="space-between" align="center">
            <Link href="/trainings">
              <Text fontSize="2xl" fontWeight="bold" color="blue.500">
                HandFit
              </Text>
            </Link>

            {isMobile ? (
              <>
                <IconButton
                  aria-label="Open menu"
                  icon={<FaBars />}
                  variant="ghost"
                  onClick={onOpen}
                />
                <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
                  <DrawerOverlay />
                  <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>Menu</DrawerHeader>
                    <DrawerBody>
                      <VStack spacing={4} align="stretch">
                        <NavContent />
                      </VStack>
                    </DrawerBody>
                  </DrawerContent>
                </Drawer>
              </>
            ) : (
              <HStack spacing={4}>
                <NavContent />
              </HStack>
            )}
          </HStack>
        </MotionBox>
      </Container>
    </Box>
  );
};

export default TrainingNavbar;
