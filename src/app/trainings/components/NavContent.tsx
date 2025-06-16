"use client";

import {
  Badge,
  Box,
  Button,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { FaFire, FaMedal, FaUserCircle } from "react-icons/fa";
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
  const router = useRouter();
  const isMobile = useBreakpointValue({ base: true, md: false });

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
    </Box>
  );
};

export default NavContent;
