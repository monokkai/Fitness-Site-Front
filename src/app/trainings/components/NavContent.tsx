"use client";

import { useUserStore } from "@/app/shared/store/userStore";
import {
  Avatar,
  Badge,
  Box,
  Button,
  Divider,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { FaFire, FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import { IoMdTrophy } from "react-icons/io";

const navItems = [
  {
    label: "Rewards",
    icon: <IoMdTrophy size={20} />,
    path: "/rewards",
    streak: "0",
  },
];

const NavContent: React.FC = () => {
  const { user, logout } = useUserStore();
  const router = useRouter();
  const isMobile = useBreakpointValue({ base: true, md: false });

  const handleLogout: () => Promise<void> = async () => {
    await logout();
    router.push("/");
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      bg="transparent"
      gap={4}
      backdropFilter="blur(10px)"
    >
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
            <Badge
              ml={2}
              borderRadius="full"
              colorScheme="orange"
              variant="solid"
            >
              {item.streak}
            </Badge>
          )}
        </Button>
      ))}
      <Menu gutter={4}>
        <MenuButton
          as={Button}
          variant="ghost"
          display="flex"
          alignItems="center"
          gap={2}
          px={2}
        >
          <Box display="flex" flexDirection="row" alignItems="center" gap={2}>
            <Avatar
              size="sm"
              name={user?.username || "Unknown"}
              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.username}`}
            />
            <Box fontSize="20px" display={{ base: "none", md: "block" }}>
              {user?.username ? user.username : "Guest"}
            </Box>
          </Box>
        </MenuButton>
        <MenuList
          bg="white"
          color={"black"}
          border="1px solid"
          borderColor="gray.100"
          boxShadow="sm"
          py={2}
          sx={{
            "& > button": {
              transition: "background 0.2s ease",
            },
          }}
        >
          <MenuItem
            icon={<FaUserCircle />}
            onClick={() => router.push("/profile")}
            py={2}
            px={4}
            _hover={{ bg: "gray.50" }}
          >
            Profile Settings
          </MenuItem>
          <MenuItem
            color="green.500"
            icon={<FaFire />}
            py={2}
            px={4}
            _hover={{ bg: "gray.50" }}
          >
            Current Streak: 7 days
          </MenuItem>
          <Divider my={2} />
          <MenuItem
            icon={<FaSignOutAlt />}
            onClick={handleLogout}
            isDisabled={!user?.username}
            py={2}
            px={4}
            color={user?.username ? "red.500" : "gray.400"}
            opacity={user?.username ? 1 : 0.6}
            cursor={user?.username ? "pointer" : "not-allowed"}
            _hover={user?.username ? { bg: "gray.50" } : {}}
          >
            Sign Out
          </MenuItem>
        </MenuList>
      </Menu>
    </Box>
  );
};

export default NavContent;
