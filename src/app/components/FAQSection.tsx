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
import faqItems from "../utils/faqItems";
import { useEffect } from "react";

export default function FAQSection() {
  const bg = useColorModeValue("white", "gray.900");
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
    <Box
      id="faq-section"
      bg={bg}
      py={{ base: 16, md: 24 }}
      px={{ base: 4, md: 12 }}
    >
      <Container maxW="3xl" textAlign="center" mb={16}>
        <Heading as="h2" size="xl" mb={4} color={headingColor}>
          Questions? Answers.
        </Heading>
        <Text fontSize="lg" color={textColor}>
          Find quick answers to the most common questions about HandFit+.
        </Text>
      </Container>

      <Container maxW="4xl">
        <Accordion allowToggle>
          {faqItems.map((item, index) => (
            <AccordionItem
              key={index}
              borderTopWidth="1px"
              borderColor={itemBorderColor}
            >
              <Heading as="h2">
                <AccordionButton
                  py={4}
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
            </AccordionItem>
          ))}
          <AccordionItem
            borderTopWidth="1px"
            borderBottomWidth="1px"
            borderColor={itemBorderColor}
          >
            <Heading as="h2">
              <AccordionButton
                py={4}
                _hover={{ bg: accordionButtonHoverBg }}
                _expanded={{ bg: accordionButtonExpandedBg }}
                color={textColor}
              >
                <Box flex="1" textAlign="left" fontWeight="medium">
                  Can I adjust the volume of the trainer&apos;s voice or the
                  music in my workouts?
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </Heading>
            <AccordionPanel pb={4} textAlign="left" color={textColor}>
              Yes. With Audio Focus, you can prioritize the volume of the
              trainer or the music so you can hear more of whatever is most
              important to you.
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </Container>
    </Box>
  );
}
