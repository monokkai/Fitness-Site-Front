"use client";

import {
  Box,
  Container,
  HStack,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Text,
  Badge,
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
import { FaUserCircle, FaMedal, FaFire, FaBars } from "react-icons/fa";
import { IoMdTrophy } from "react-icons/io";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Link from "next/link";

const MotionBox = motion(Box);

const TrainingNavbar = () => {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const isMobile = useBreakpointValue({ base: true, md: false });

  const navItems = [
    {
      label: "Rewards",
      icon: <IoMdTrophy size={20} />,
      path: "/rewards",
      streak: "7 🔥",
    },
    {
      label: "Achievements",
      icon: <FaMedal size={20} />,
      path: "/achievements",
      count: 12,
    },
  ];

  const NavContent = () => (
    <>
      {navItems.map((item, index) => (
        <Button
          key={index}
          variant="ghost"
          leftIcon={item.icon}
          onClick={() => router.push(item.path)}
          size={isMobile ? "md" : "lg"}
          display="flex"
          alignItems="center"
        >
          {item.label}
          {item.streak && (
            <Badge ml={2} colorScheme="orange" variant="solid">
              {item.streak}
            </Badge>
          )}
          {item.count && (
            <Badge ml={2} colorScheme="purple" variant="solid">
              {item.count}
            </Badge>
          )}
        </Button>
      ))}
      <Menu>
        <MenuButton
          as={IconButton}
          icon={<FaUserCircle size={24} />}
          variant="ghost"
          colorScheme="blue"
          size="lg"
          aria-label="User menu"
        />
        <MenuList>
          <MenuItem
            icon={<FaUserCircle />}
            onClick={() => router.push("/profile")}
          >
            Profile Settings
          </MenuItem>
          <MenuItem icon={<FaFire />}>Current Streak: 7 days</MenuItem>
        </MenuList>
      </Menu>
    </>
  );

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
