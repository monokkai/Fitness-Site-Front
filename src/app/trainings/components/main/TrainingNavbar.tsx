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
  Divider,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import {
  FaBars,
  FaUserCircle,
  FaSignOutAlt,
  FaDumbbell,
  FaFire,
} from "react-icons/fa";
import { IoMdTrophy } from "react-icons/io";
import { motion } from "framer-motion";
import Link from "next/link";
import { useAuth } from "../../../shared/context/authContext";
import useUserProfile from "../../../shared/hooks/useUserProfile";
import { useRouter } from "next/navigation";

const MotionBox = motion(Box);

const TrainingNavbar: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const isMobile = useBreakpointValue({ base: true, md: false });
  const { user, logout } = useAuth();
  const { data: profile } = useUserProfile(user?.id);
  const router = useRouter();

  const currentStreak = profile?.currentStreak || 0;

  const navItems = [
    {
      label: "Rewards",
      icon: <IoMdTrophy size={20} />,
      path: "/rewards",
    },
  ];

  const handleLogout = async () => {
    try {
      await logout();
      onClose();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

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
              <Text fontSize="2xl" fontWeight="bold" color="black">
                HandFit
              </Text>
            </Link>

            {isMobile ? (
              <Box color={"black"} bg={"#9adb16"} borderRadius={5}>
                <IconButton
                  aria-label="Open menu"
                  icon={<FaBars />}
                  variant="ghost"
                  onClick={onOpen}
                />
                <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
                  <DrawerOverlay />
                  <DrawerContent bg={"white"} color="black">
                    <DrawerCloseButton />
                    <DrawerHeader color="black">HandFit</DrawerHeader>
                    <DrawerBody bg={"white"} color={"black"}>
                      <VStack
                        bg={"white"}
                        color={"black"}
                        spacing={4}
                        align="stretch"
                        py={4}
                      >
                        {navItems.map((item, index) => (
                          <Box
                            key={index}
                            as="button"
                            textAlign="left"
                            onClick={() => {
                              router.push(item.path);
                              onClose();
                            }}
                            py={2}
                            px={4}
                            borderRadius="md"
                            _hover={{ bg: "gray.100" }}
                            display="flex"
                            alignItems="center"
                            gap={3}
                            color="black"
                          >
                            {item.icon}
                            <Text fontSize="md" color="black">
                              {item.label}
                            </Text>
                          </Box>
                        ))}

                        <Divider />

                        {user && (
                          <>
                            <Box
                              as="button"
                              textAlign="left"
                              onClick={() => {
                                router.push("/profile");
                                onClose();
                              }}
                              py={2}
                              px={4}
                              borderRadius="md"
                              _hover={{ bg: "gray.100" }}
                              display="flex"
                              alignItems="center"
                              gap={3}
                              color="black"
                            >
                              <FaUserCircle size={18} />
                              <Text fontSize="md" color="black">
                                Profile Settings
                              </Text>
                            </Box>

                            <Box
                              as="button"
                              textAlign="left"
                              onClick={() => {
                                router.push("/trainings");
                                onClose();
                              }}
                              py={2}
                              px={4}
                              borderRadius="md"
                              _hover={{ bg: "gray.100" }}
                              display="flex"
                              alignItems="center"
                              gap={3}
                              color="black"
                            >
                              <FaDumbbell size={18} />
                              <Text fontSize="md" color="black">
                                Trainings
                              </Text>
                            </Box>

                            <Box
                              py={2}
                              px={4}
                              display="flex"
                              alignItems="center"
                              gap={3}
                              color="green.600"
                            >
                              <FaFire size={18} />
                              <Text fontSize="md" color="green.600">
                                Current Streak: {currentStreak}{" "}
                                {currentStreak === 1 ? "day" : "days"}
                              </Text>
                            </Box>

                            <Divider />

                            <Box
                              as="button"
                              textAlign="left"
                              onClick={handleLogout}
                              py={2}
                              px={4}
                              borderRadius="md"
                              _hover={{ bg: "red.50" }}
                              display="flex"
                              alignItems="center"
                              gap={3}
                              color="red.600"
                            >
                              <FaSignOutAlt size={18} />
                              <Text fontSize="md" color="red.600">
                                Sign Out
                              </Text>
                            </Box>
                          </>
                        )}

                        {!user && (
                          <>
                            <Box
                              as="button"
                              textAlign="left"
                              onClick={() => {
                                router.push("/auth");
                                onClose();
                              }}
                              py={2}
                              px={4}
                              borderRadius="md"
                              _hover={{ bg: "blue.50" }}
                              color="blue.600"
                            >
                              <Text fontSize="md" color="blue.600">
                                Sign In
                              </Text>
                            </Box>
                            <Box
                              as="button"
                              textAlign="left"
                              onClick={() => {
                                router.push("/signup");
                                onClose();
                              }}
                              py={2}
                              px={4}
                              borderRadius="md"
                              _hover={{ bg: "gray.100" }}
                              color="black"
                            >
                              <Text fontSize="md" color="black">
                                Create Account
                              </Text>
                            </Box>
                          </>
                        )}
                      </VStack>
                    </DrawerBody>
                  </DrawerContent>
                </Drawer>
              </Box>
            ) : (
              <HStack spacing={4}>
                <Box
                  display="flex"
                  alignItems="center"
                  bg="transparent"
                  gap={4}
                >
                  {navItems.map((item, index) => (
                    <Box
                      key={index}
                      as="button"
                      onClick={() => router.push(item.path)}
                      display="flex"
                      alignItems="center"
                      gap={2}
                      py={2}
                      px={3}
                      borderRadius="md"
                      _hover={{ bg: "gray.100" }}
                      color="black"
                    >
                      {item.icon}
                      <Text fontSize="md" color="black">
                        {item.label}
                      </Text>
                    </Box>
                  ))}

                  {user ? (
                    <Menu>
                      <MenuButton>
                        <Avatar
                          size="sm"
                          name={user.username}
                          src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(user.username)}`}
                          cursor="pointer"
                          _hover={{ opacity: 0.8 }}
                        />
                      </MenuButton>
                      <MenuList bg="white" color="black" borderColor="gray.200">
                        <MenuItem
                          icon={<FaUserCircle />}
                          onClick={() => router.push("/profile")}
                          bg="white"
                          _hover={{ bg: "gray.100" }}
                          color="black"
                        >
                          Profile Settings
                        </MenuItem>
                        <MenuItem
                          icon={<FaDumbbell />}
                          onClick={() => router.push("/trainings")}
                          bg="white"
                          _hover={{ bg: "gray.100" }}
                          color="black"
                        >
                          Trainings
                        </MenuItem>
                        <MenuItem
                          icon={<FaFire />}
                          color="green.600"
                          bg="white"
                          _hover={{ bg: "gray.100" }}
                        >
                          Current Streak: {currentStreak}{" "}
                          {currentStreak === 1 ? "day" : "days"}
                        </MenuItem>
                        <Divider />
                        <MenuItem
                          icon={<FaSignOutAlt />}
                          onClick={handleLogout}
                          color="red.600"
                          bg="white"
                          _hover={{ bg: "red.50" }}
                        >
                          Sign Out
                        </MenuItem>
                      </MenuList>
                    </Menu>
                  ) : (
                    <HStack spacing={3}>
                      <Box
                        as="button"
                        onClick={() => router.push("/auth")}
                        py={2}
                        px={4}
                        borderRadius="md"
                        _hover={{ bg: "blue.50" }}
                        color="blue.600"
                      >
                        Sign In
                      </Box>
                      <Box
                        as="button"
                        onClick={() => router.push("/signup")}
                        py={2}
                        px={4}
                        borderRadius="md"
                        bg="blue.600"
                        color="white"
                        _hover={{ bg: "blue.700" }}
                      >
                        Sign Up
                      </Box>
                    </HStack>
                  )}
                </Box>
              </HStack>
            )}
          </HStack>
        </MotionBox>
      </Container>
    </Box>
  );
};

export default TrainingNavbar;
