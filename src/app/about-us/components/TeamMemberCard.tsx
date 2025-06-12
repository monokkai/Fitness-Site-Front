import {
  Box,
  VStack,
  Heading,
  Text,
  Image,
  HStack,
  Icon,
  useColorModeValue,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { FaGithub, FaTwitter, FaLinkedin } from "react-icons/fa";

const MotionVStack = motion(VStack);

interface TeamMemberProps {
  imageSrc: string;
  name: string;
  title: string;
  githubUrl?: string;
  twitterUrl?: string;
  linkedinUrl?: string;
}

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

export default function TeamMemberCard({
  imageSrc,
  name,
  title,
  githubUrl,
  twitterUrl,
  linkedinUrl,
}: TeamMemberProps) {
  const bg = useColorModeValue("white", "gray.900");
  const textColor = useColorModeValue("gray.600", "gray.400");
  const headingColor = useColorModeValue("gray.900", "white");
  const purpleColor = useColorModeValue("purple.600", "purple.400");

  return (
    <MotionVStack
      spacing={6}
      p={8}
      bg={bg}
      borderRadius="2xl"
      variants={fadeInUp}
      whileHover={{
        y: -5,
        transition: { duration: 0.3, ease: "easeInOut" },
      }}
      style={{ boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" }}
    >
      <Box
        w="full"
        h="240px"
        bg="gray.200"
        borderRadius="xl"
        overflow="hidden"
        position="relative"
      >
        <Image src={imageSrc} alt={name} objectFit="cover" w="full" h="full" />
      </Box>
      <VStack spacing={2} align="center">
        <Heading as="h3" size="md" color={headingColor}>
          {name}
        </Heading>
        <Text color={textColor}>{title}</Text>
        <HStack spacing={4}>
          {githubUrl && (
            <Icon
              as={FaGithub}
              w={5}
              h={5}
              color={textColor}
              cursor="pointer"
              _hover={{ color: purpleColor }}
            />
          )}
          {twitterUrl && (
            <Icon
              as={FaTwitter}
              w={5}
              h={5}
              color={textColor}
              cursor="pointer"
              _hover={{ color: purpleColor }}
            />
          )}
          {linkedinUrl && (
            <Icon
              as={FaLinkedin}
              w={5}
              h={5}
              color={textColor}
              cursor="pointer"
              _hover={{ color: purpleColor }}
            />
          )}
        </HStack>
      </VStack>
    </MotionVStack>
  );
}
