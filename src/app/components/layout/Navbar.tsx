"use client";

import {
  Box,
  Button,
  Flex,
  IconButton,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  VStack,
  Spacer,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Avatar,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import navbarItems, { NavbarItem } from "../../shared/utils/navbarItems";
import { useAuth } from "../../shared/context/authContext";
import { FaDumbbell, FaUser, FaSignOutAlt } from "react-icons/fa";

const Navbar: React.FC = () => {
  const pathname = usePathname();
  const isPricingPage = pathname?.startsWith("/pricing");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user, isLoading, logout } = useAuth();
  const [isVisible, setIsVisible] = useState(false);
  const navbarSpringWidth = useSpring(700, { stiffness: 100, damping: 20 });

  const MotionFlex = motion(Flex);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsVisible(true);
        navbarSpringWidth.set(900);
      } else {
        setIsVisible(false);
        navbarSpringWidth.set(700);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [navbarSpringWidth]);

  const filteredItems = navbarItems.filter((item) => {
    if (user) {
      return !item.guestOnly;
    }
    return !item.authOnly;
  });

  const topMenuItems = filteredItems.filter(
    (item) => !["/trainings", "/profile"].includes(item.href)
  );

  const hoverGlow = {
    transition: "all 0.2s ease-in-out",
    boxShadow: isPricingPage
      ? "0 0 20px rgba(255, 255, 255, 0.1)"
      : "0 0 20px rgba(0, 0, 0, 0.1)",
  };

  const handleClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (href.includes("#faq-section")) {
      e.preventDefault();
      const element = document.getElementById("faq-section");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const getActiveStyles = (href: string) => {
    const isActive = pathname === href;
    return {
      variant: "ghost",
      color: isPricingPage ? "white" : "black",
      _hover: {
        bg: "transparent",
        transform: "translateY(-1px)",
        textShadow: isPricingPage
          ? "0 0 8px rgba(255, 255, 255, 0.5)"
          : "0 0 8px rgba(0, 0, 0, 0.2)",
      },
      _before: isActive
        ? {
            content: '""',
            position: "absolute",
            bottom: "-4px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "4px",
            height: "4px",
            borderRadius: "full",
            bg: isPricingPage ? "white" : "black",
            boxShadow: isPricingPage
              ? "0 0 8px rgba(255, 255, 255, 0.5)"
              : "0 0 8px rgba(0, 0, 0, 0.2)",
          }
        : undefined,
    };
  };

  return (
    <MotionFlex
      position="fixed"
      top="1.5rem"
      left="50%"
      zIndex="50"
      style={{ maxWidth: navbarSpringWidth }}
      px={{ base: 3, md: 4 }}
      py={2}
      border="1px solid"
      borderColor={isPricingPage ? "whiteAlpha.200" : "rgba(0, 0, 0, 0.1)"}
      borderRadius={30}
      boxShadow={
        isPricingPage
          ? "0 4px 12px rgba(255, 255, 255, 0.1)"
          : "0 4px 12px rgba(0, 0, 0, 0.1)"
      }
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      color={isPricingPage ? "white" : "black"}
      transform="translateX(-50%)"
      _hover={hoverGlow}
      backdropFilter="blur(8px)"
      bg={isPricingPage ? "rgba(0, 0, 0, 0.3)" : "rgba(255, 255, 255, 0.7)"}
    >
      <IconButton
        aria-label="Open menu"
        icon={<HamburgerIcon />}
        display={{ base: "flex", md: "none" }}
        onClick={onOpen}
        variant="ghost"
        color={isPricingPage ? "white" : "black"}
        _hover={{
          bg: "transparent",
          transform: "translateY(-1px)",
          textShadow: isPricingPage
            ? "0 0 8px rgba(255, 255, 255, 0.5)"
            : "0 0 8px rgba(0, 0, 0, 0.2)",
        }}
      />

      <Link
        href="/"
        aria-label="Go to homepage"
        className={`p-2 tracking-tight text-2xl font-bold transition-all ${
          isPricingPage ? "text-white" : "text-black"
        } hover:opacity-80`}
      >
        HandFit
      </Link>

      <Spacer display={{ base: "none", md: "block" }} />

      <Flex display={{ base: "none", md: "flex" }} alignItems="center" gap={4}>
        {topMenuItems.map(({ href, label }: NavbarItem) => (
          <Link
            key={href}
            href={href}
            onClick={(e) => handleClick(e, href)}
            aria-label={`Go to ${label}`}
            scroll={
              href.startsWith("/") && !href.includes("#") ? undefined : false
            }
          >
            <Button {...getActiveStyles(href)}>{label}</Button>
          </Link>
        ))}

        {!isLoading && user && (
          <Menu>
            <MenuButton
              as={Button}
              variant="ghost"
              color={isPricingPage ? "white" : "black"}
              _hover={{
                bg: "transparent",
                transform: "translateY(-1px)",
                textShadow: isPricingPage
                  ? "0 0 8px rgba(255, 255, 255, 0.5)"
                  : "0 0 8px rgba(0, 0, 0, 0.2)",
              }}
            >
              <Avatar
                size="sm"
                name={user.username}
                src={
                  user?.username
                    ? `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(user.username)}`
                    : undefined
                }
                bg="brand.400"
              />
            </MenuButton>
            <MenuList
              bg="white"
              color="black"
              border="1px solid"
              borderColor="gray.100"
              boxShadow="md"
            >
              <MenuItem
                icon={<FaUser />}
                onClick={() => (window.location.href = "/profile")}
                bg="white"
                _hover={{
                  bg: "gray.100",
                }}
              >
                Profile
              </MenuItem>
              <MenuItem
                icon={<FaDumbbell />}
                onClick={() => (window.location.href = "/trainings")}
                bg="white"
                _hover={{
                  bg: "gray.100",
                }}
              >
                Trainings
              </MenuItem>
              <MenuDivider />
              <MenuItem
                icon={<FaSignOutAlt />}
                onClick={logout}
                bg="white"
                color={"red.400"}
                _hover={{
                  bg: "gray.100",
                }}
              >
                Logout
              </MenuItem>
            </MenuList>
          </Menu>
        )}
      </Flex>

      <AnimatePresence>
        {isVisible && !isLoading && !user && (
          <motion.div
            initial={{ x: 70, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 70, opacity: 0 }}
            transition={{ type: "spring", stiffness: 60, damping: 15 }}
          >
            <Button
              bg={pathname === "/login" ? "brand.400" : "brand.300"}
              color="black"
              _hover={{
                bg: "gray.100",
                transform: "translateY(-1px)",
                boxShadow: "0 0 20px rgba(170, 255, 3, 0.3)",
              }}
              borderRadius={20}
            >
              <Link href="/auth" passHref>
                Sign In
              </Link>
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent bg="white">
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px" color="black">
            HandFit
          </DrawerHeader>
          <DrawerBody>
            <VStack alignItems="flex-start" spacing={4}>
              {topMenuItems.map(({ href, label }: NavbarItem) => (
                <Link
                  key={href}
                  href={href}
                  onClick={(e) => {
                    handleClick(e, href);
                    onClose();
                  }}
                  style={{
                    position: "relative",
                    padding: "4px 0",
                    width: "100%",
                    color: pathname === href ? "black" : "#4A5568",
                    fontWeight: pathname === href ? "bold" : "normal",
                  }}
                >
                  {label}
                  {pathname === href && (
                    <Box
                      position="absolute"
                      bottom="-2px"
                      left="0"
                      width="4px"
                      height="4px"
                      borderRadius="full"
                      bg="black"
                    />
                  )}
                </Link>
              ))}

              {/* Исправленная часть для мобильного меню */}
              {!isLoading && user ? (
                <>
                  <Link
                    href="/profile"
                    onClick={onClose}
                    style={{
                      position: "relative",
                      padding: "4px 0",
                      width: "100%",
                      color: pathname === "/profile" ? "black" : "#4A5568",
                      fontWeight: pathname === "/profile" ? "bold" : "normal",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <FaUser size={14} />
                    Profile
                    {pathname === "/profile" && (
                      <Box
                        position="absolute"
                        bottom="-2px"
                        left="0"
                        width="4px"
                        height="4px"
                        borderRadius="full"
                        bg="black"
                      />
                    )}
                  </Link>

                  <Link
                    href="/trainings"
                    onClick={onClose}
                    style={{
                      position: "relative",
                      padding: "4px 0",
                      width: "100%",
                      color: pathname === "/trainings" ? "black" : "#4A5568",
                      fontWeight: pathname === "/trainings" ? "bold" : "normal",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <FaDumbbell size={14} />
                    Trainings
                    {pathname === "/trainings" && (
                      <Box
                        position="absolute"
                        bottom="-2px"
                        left="0"
                        width="4px"
                        height="4px"
                        borderRadius="full"
                        bg="black"
                      />
                    )}
                  </Link>

                  <Box
                    onClick={() => {
                      logout();
                      onClose();
                    }}
                    style={{
                      position: "relative",
                      padding: "4px 0",
                      width: "100%",
                      color: "#E53E3E",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <FaSignOutAlt size={14} />
                    Logout
                  </Box>
                </>
              ) : (
                !isLoading && (
                  <Link href="/auth" passHref onClick={onClose}>
                    <Button
                      bg={pathname === "/login" ? "brand.400" : "brand.300"}
                      color="black"
                      _hover={{
                        bg: "brand.400",
                        transform: "translateY(-1px)",
                        boxShadow: "0 0 20px rgba(170, 255, 3, 0.3)",
                      }}
                      borderRadius={20}
                    >
                      Sign In
                    </Button>
                  </Link>
                )
              )}
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </MotionFlex>
  );
};

export default Navbar;
