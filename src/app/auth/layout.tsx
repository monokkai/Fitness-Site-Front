import { Box } from "@chakra-ui/react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // <Box className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-[#0f0c29] dark:to-[#302b63]">
    <Box bg={"white"}>
      {children}
    </Box>
  );
} 