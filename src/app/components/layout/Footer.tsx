"use client";

import {
  Box,
  Heading,
  useColorModeValue,
  Flex,
  Link as ChakraLink,
  Stack,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";
import { FaGithub, FaTwitter, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  const bg = useColorModeValue("gray.50", "gray.900");
  const color = useColorModeValue("gray.600", "gray.300");
  const linkHoverColor = useColorModeValue("brand.300", "brand.300");

  return (
    <Box
      as="footer"
      bg={bg}
      py={{ base: 8, md: 12 }}
      mt={20}
      borderTop="1px solid"
      borderColor={useColorModeValue("gray.200", "gray.700")}
    >
      <Flex
        direction={{ base: "column", md: "row" }}
        justify="space-between"
        align="center"
        maxW="container.xl"
        mx="auto"
        px={{ base: 6, md: 12 }}
        gap={{ base: 6, md: 0 }}
      >
        <Box textAlign={{ base: "center", md: "left" }}>
          <Heading as="h4" size="md" fontWeight="bold" color={color}>
            © {new Date().getFullYear()} Git Glade
          </Heading>
          <Text fontSize="sm" mt={1} color={color}>
            All rights reserved.
          </Text>
        </Box>

        <Stack
          direction={{ base: "column", md: "row" }}
          spacing={{ base: 4, md: 8 }}
          align="center"
        >
          <Link href="/about" passHref legacyBehavior>
            <ChakraLink
              fontWeight="medium"
              color={color}
              _hover={{ color: linkHoverColor, textDecoration: "underline" }}
            >
              About
            </ChakraLink>
          </Link>
          <Link href="/features" passHref legacyBehavior>
            <ChakraLink
              fontWeight="medium"
              color={color}
              _hover={{ color: linkHoverColor, textDecoration: "underline" }}
            >
              Features
            </ChakraLink>
          </Link>
          <Link href="/pricing" passHref legacyBehavior>
            <ChakraLink
              fontWeight="medium"
              color={color}
              _hover={{ color: linkHoverColor, textDecoration: "underline" }}
            >
              Pricing
            </ChakraLink>
          </Link>
          <Link href="/blog" passHref legacyBehavior>
            <ChakraLink
              fontWeight="medium"
              color={color}
              _hover={{ color: linkHoverColor, textDecoration: "underline" }}
            >
              Blog
            </ChakraLink>
          </Link>
        </Stack>

        <Stack direction="row" spacing={6} align="center" justify="center">
          <ChakraLink
            href="https://github.com/jenni-ai"
            isExternal
            aria-label="GitHub"
            color={color}
            _hover={{ color: linkHoverColor }}
          >
            <FaGithub size="24px" />
          </ChakraLink>
          <ChakraLink
            href="https://twitter.com/jenni_ai"
            isExternal
            aria-label="Twitter"
            color={color}
            _hover={{ color: linkHoverColor }}
          >
            <FaTwitter size="24px" />
          </ChakraLink>
          <ChakraLink
            href="https://linkedin.com/company/jenni-ai"
            isExternal
            aria-label="LinkedIn"
            color={color}
            _hover={{ color: linkHoverColor }}
          >
            <FaLinkedin size="24px" />
          </ChakraLink>
        </Stack>
      </Flex>
    </Box>
  );
}
