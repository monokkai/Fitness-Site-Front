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
import { FaFire, FaMedal, FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import { IoMdTrophy } from "react-icons/io";

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

const NavContent: React.FC = () => {
  const { user, logout } = useUserStore();
  const router = useRouter();
  const isMobile = useBreakpointValue({ base: true, md: false });

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  return (
    <Box display="flex" alignItems="center" gap={4}>
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
              name={user?.username || "User"}
              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.username}`}
            />
            <Box fontSize="20px" display={{ base: "none", md: "block" }}>
              {user?.username}
            </Box>
          </Box>
        </MenuButton>
        <MenuList color={"black"}>
          <MenuItem
            icon={<FaUserCircle />}
            onClick={() => router.push("/profile")}
          >
            Profile Settings
          </MenuItem>
          <MenuItem color="green.500" icon={<FaFire />}>
            Current Streak: 7 days
          </MenuItem>
          <Divider my={2} />
          <MenuItem
            icon={<FaSignOutAlt />}
            onClick={handleLogout}
            color="red.500"
          >
            Sign Out
          </MenuItem>
        </MenuList>
      </Menu>
    </Box>
  );
};

export default NavContent;
