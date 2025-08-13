import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Avatar,
  Button,
} from "@chakra-ui/react";
import { FaDumbbell, FaUser, FaSignOutAlt } from "react-icons/fa";
import { useAuth } from "../../../shared/context/authContext";

interface NavbarUserMenuProps {
  isPricingPage: boolean;
}

export const NavbarUserMenu = ({ isPricingPage }: NavbarUserMenuProps) => {
  const { user, logout } = useAuth();

  if (!user) return null;

  return (
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
        >
          Profile
        </MenuItem>
        <MenuItem
          icon={<FaDumbbell />}
          onClick={() => (window.location.href = "/trainings")}
        >
          Trainings
        </MenuItem>
        <MenuDivider />
        <MenuItem icon={<FaSignOutAlt />} onClick={logout} color="red.500">
          Logout
        </MenuItem>
      </MenuList>
    </Menu>
  );
};
