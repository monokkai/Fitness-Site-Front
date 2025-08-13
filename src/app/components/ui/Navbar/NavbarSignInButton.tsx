import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@chakra-ui/react";
import Link from "next/link";
import { useAuth } from "../../../shared/context/authContext";

interface NavbarSignInButtonProps {
  isVisible: boolean;
  pathname?: string;
}

export const NavbarSignInButton = ({
  isVisible,
  pathname,
}: NavbarSignInButtonProps) => {
  const { user, isLoading } = useAuth();

  if (isLoading || user) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ x: 70, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 70, opacity: 0 }}
          transition={{ type: "spring", stiffness: 60, damping: 15 }}
        >
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
            >
              Sign In
            </Button>
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
