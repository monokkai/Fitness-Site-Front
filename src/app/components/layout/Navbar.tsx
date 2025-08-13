"use client";

import { Flex, IconButton, useDisclosure } from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import { useAuth } from "../../shared/context/authContext";
import {
  navbarItems,
  filterNavbarItems,
  getTopMenuItems,
} from "../ui/Navbar/NavbarItems";
import { NavbarDesktop } from "../ui/Navbar/NavbarDesktop";
import { NavbarMobile } from "../ui/Navbar/NavbarMobile";

const MotionFlex = motion(Flex);

export const Navbar = () => {
  const pathname = usePathname();
  const isPricingPage = pathname?.startsWith("/pricing");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user } = useAuth();
  const [isVisible, setIsVisible] = useState(false);
  const navbarSpringWidth = useSpring(700, { stiffness: 100, damping: 20 });

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

  const filteredItems = filterNavbarItems(!!user, navbarItems);
  const topMenuItems = getTopMenuItems(filteredItems);

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
    <>
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

        <NavbarDesktop
          items={topMenuItems}
          isPricingPage={isPricingPage}
          pathname={pathname}
          isVisible={isVisible}
          handleClick={handleClick}
          getActiveStyles={getActiveStyles}
        />
      </MotionFlex>

      <NavbarMobile
        isOpen={isOpen}
        onClose={onClose}
        items={topMenuItems}
        pathname={pathname}
        handleClick={handleClick}
      />
    </>
  );
};

export default Navbar;
