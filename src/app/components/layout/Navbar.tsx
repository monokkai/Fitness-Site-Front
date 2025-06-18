"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
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
  Box,
  HStack,
  Text,
  Avatar,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { motion, AnimatePresence, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import navbarItems, { NavbarItem } from "../../shared/utils/navbarItems";
import { useUserStore } from "../../shared/store/userStore";

const Navbar: React.FC = () => {
  const pathname = usePathname();
  const isPricingPage = pathname?.startsWith("/pricing");

  const { user, token } = useUserStore();
  const isAuthenticated = !!token && !!user;

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
      color: isPricingPage ? "white" : "gray.800",
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

  const { isOpen, onOpen, onClose } = useDisclosure();
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
      color={isPricingPage ? "white" : "gray.800"}
      transform="translateX(-50%)"
      _hover={hoverGlow}
      backdropFilter="blur(10px)"
    >
      <IconButton
        aria-label="Open menu"
        icon={<HamburgerIcon />}
        display={{ base: "flex", md: "none" }}
        onClick={onOpen}
        variant="ghost"
        color={isPricingPage ? "white" : "gray.800"}
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
          isPricingPage ? "text-white" : "text-gray.800"
        } hover:opacity-80`}
      >
        HandFit
      </Link>

      <Spacer display={{ base: "none", md: "block" }} />

      <Flex display={{ base: "none", md: "flex" }} alignItems="center" gap={4}>
        {navbarItems.map(({ href, label }: NavbarItem) => (
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
      </Flex>

      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ x: 70, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 70, opacity: 0 }}
            transition={{ type: "spring", stiffness: 60, damping: 15 }}
          >
            {isAuthenticated ? (
              <HStack spacing={3}>
                <Avatar
                  size="sm"
                  name={user?.username}
                  bg="green.500"
                  color="white"
                />
                <Text fontSize="18px" fontWeight="medium">
                  {user?.username}
                </Text>
              </HStack>
            ) : (
              <Link href="/auth" passHref>
                <Button
                  bg={pathname === "/login" ? "brand.400" : "brand.300"}
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
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent bg="white" color="gray.800">
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">Navigation</DrawerHeader>
          <DrawerBody>
            <VStack alignItems="flex-start" spacing={4}>
              {navbarItems.map(({ href, label }: NavbarItem) => (
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
                    color: pathname === href ? "black" : "inherit",
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
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </MotionFlex>
  );
};

export default Navbar;
