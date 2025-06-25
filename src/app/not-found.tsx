import Link from "next/link";
import { Box, Heading, Text, Button, VStack } from "@chakra-ui/react";

const NotFound: React.FC = () => {
  return (
    <Box
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bgGradient="linear(to-br, gray.900, black)"
    >
      <VStack spacing={6} textAlign="center" px={6}>
        <Heading as="h1" fontSize="9xl" fontWeight="bold" color="white">
          404
        </Heading>
        <Heading as="h2" fontSize="4xl" fontWeight="semibold" color="white">
          Page Not Found
        </Heading>
        <Text fontSize="lg" color="gray.400">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </Text>
        <Link href="/" passHref>
          <Button
            as="a"
            size="lg"
            colorScheme="blue"
            fontSize="lg"
            borderRadius="30px"
            px={8}
            _hover={{ transform: "scale(1.05)" }}
            transition="all 0.2s"
          >
            Go Home
          </Button>
        </Link>
      </VStack>
    </Box>
  );
};

export default NotFound;
