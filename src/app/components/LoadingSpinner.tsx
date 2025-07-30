import { Spinner, Flex } from "@chakra-ui/react";

export default function LoadingSpinner() {
  return (
    <Flex justify="center" align="center" minH="200px">
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="brand.400"
        size="xl"
      />
    </Flex>
  );
}
