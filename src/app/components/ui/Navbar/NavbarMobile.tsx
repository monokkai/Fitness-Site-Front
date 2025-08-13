import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  VStack,
  Box,
  Button,
  Divider,
} from "@chakra-ui/react";
import Link from "next/link";
import { NavbarItem } from "../../types";
import { FaDumbbell, FaUser, FaSignOutAlt } from "react-icons/fa";
import { useAuth } from "../../../shared/context/authContext";

interface NavbarMobileProps {
  isOpen: boolean;
  onClose: () => void;
  items: NavbarItem[];
  pathname?: string;
  handleClick: (e: React.MouseEvent<HTMLAnchorElement>, href: string) => void;
}

export const NavbarMobile = ({
  isOpen,
  onClose,
  items,
  pathname,
  handleClick,
}: NavbarMobileProps) => {
  const { user, isLoading, logout } = useAuth();

  return (
    <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
      <DrawerOverlay />
      <DrawerContent bg="white" color="black">
        <DrawerCloseButton />
        <DrawerHeader borderBottomWidth="1px" color="black">
          HandFit
        </DrawerHeader>
        <DrawerBody p={0}>
          {/* Навигационные пункты */}
          <VStack alignItems="flex-start" spacing={4} p={4} w="100%">
            {items.map(({ href, label }: NavbarItem) => (
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
                  textAlign: "left",
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

          <Divider borderColor="gray.300" />

          <VStack alignItems="flex-start" spacing={2} p={4} w="100%">
            {!isLoading && user ? (
              <>
                <Link href="/profile" passHref>
                  <Button
                    leftIcon={<FaUser />}
                    variant="ghost"
                    justifyContent="flex-start"
                    width="100%"
                    bg="white"
                    color="gray.700"
                    _hover={{ bg: "gray.50", color: "black" }}
                  >
                    Profile
                  </Button>
                </Link>
                <Link href="/trainings" passHref>
                  <Button
                    leftIcon={<FaDumbbell />}
                    variant="ghost"
                    justifyContent="flex-start"
                    width="100%"
                    bg="white"
                    color="gray.700"
                    _hover={{ bg: "gray.50", color: "black" }}
                  >
                    Trainings
                  </Button>
                </Link>
                <Button
                  leftIcon={<FaSignOutAlt />}
                  variant="ghost"
                  justifyContent="flex-start"
                  width="100%"
                  bg="white"
                  color="red.500"
                  _hover={{ bg: "gray.50" }}
                  onClick={logout}
                >
                  Sign Out
                </Button>
              </>
            ) : (
              !isLoading && (
                <Link href="/auth" passHref>
                  <Button
                    bg={pathname === "/login" ? "brand.400" : "brand.300"}
                    color="black"
                    _hover={{
                      bg: "brand.400",
                      transform: "translateY(-1px)",
                      boxShadow: "0 0 20px rgba(170, 255, 3, 0.3)",
                    }}
                    borderRadius={20}
                    width="100%"
                    justifyContent="center"
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
  );
};
