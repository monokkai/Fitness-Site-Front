import { Box } from "@chakra-ui/react";
import BackButton from "../components/ui/BackButton";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Box bg={"white"} position="relative">
      <BackButton />
      {children}
    </Box>
  );
}
