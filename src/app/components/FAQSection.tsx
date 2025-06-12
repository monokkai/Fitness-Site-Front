"use client";

import {
  Box,
  Container,
  Heading,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import faqItems from "../components/utils/faqItems";
import { useEffect } from "react";
import { motion } from "framer-motion";

const MotionBox = motion(Box);
const MotionContainer = motion(Container);
const MotionAccordionItem = motion(AccordionItem);

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const fadeInLeft = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.5 }
};

export default function FAQSection() {
  const textColor = useColorModeValue("gray.800", "gray.100");
  const headingColor = useColorModeValue("black", "white");
  const itemBorderColor = useColorModeValue("gray.200", "gray.700");
  const accordionButtonHoverBg = useColorModeValue("gray.50", "gray.700");
  const accordionButtonExpandedBg = useColorModeValue("gray.100", "gray.800");

  useEffect(() => {
    if (window.location.hash === "#faq-section") {
      const element = document.getElementById("faq-section");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, []);

  return (
    <MotionBox
      id="faq-section"
      bg="transparent"
      py={{ base: 16, md: 24 }}
      px={{ base: 4, md: 12 }}
      variants={fadeInUp}
      initial="initial"
      whileInView="animate"
      viewport={{ amount: 0.3 }}
      transition={{ duration: 0.6 }}
    >
      <MotionContainer
        maxW="3xl"
        textAlign="center"
        mb={16}
        variants={fadeInUp}
        initial="initial"
        whileInView="animate"
        viewport={{ amount: 0.3 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <Heading as="h2" size="2xl" mb={4} color={headingColor}>
          Questions? Answers.
        </Heading>
        <Text fontSize="xl" color={textColor}>
          Find quick answers to the most common questions about HandFit+.
        </Text>
      </MotionContainer>

      <Container maxW="4xl">
        <Accordion allowToggle>
          {faqItems.map((item, index) => (
            <MotionAccordionItem
              key={index}
              fontSize={25}
              borderTopWidth="1px"
              borderColor={itemBorderColor}
              variants={fadeInLeft}
              initial="initial"
              whileInView="animate"
              viewport={{ amount: 0.3 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Heading as="h2">
                <AccordionButton
                  py={4}
                  fontSize={30}
                  _hover={{ bg: accordionButtonHoverBg }}
                  _expanded={{ bg: accordionButtonExpandedBg }}
                  color={textColor}
                >
                  <Box flex="1" textAlign="left" fontWeight="medium">
                    {item.question}
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </Heading>
              <AccordionPanel pb={4} textAlign="left" color={textColor}>
                {item.answer}
              </AccordionPanel>
            </MotionAccordionItem>
          ))}
        </Accordion>
      </Container>
    </MotionBox>
  );
}
