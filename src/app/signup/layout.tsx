import { Box } from "@chakra-ui/react";

export default function SignupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Box bg={"white"}>{children}</Box>;
}
