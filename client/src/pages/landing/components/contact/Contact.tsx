import {
  Box,
  Container,
  Flex,
  Heading,
  HStack,
  Text,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";

import { ContactForm } from "./ContactForm";
import { ContactIcon } from "./ContactIcon";
import { ContactInfo } from "./ContactInfo";

export const Contact = () => {
  return (
    <Container maxW="full" mt={0} py={5} centerContent overflow="hidden">
      <Flex>
        <Box
          bg="#02054B"
          color="white"
          borderRadius="lg"
          m={{ sm: 4, md: 16, lg: 10 }}
          p={{ sm: 5, md: 5, lg: 16 }}
        >
          <Box p={4}>
            <Wrap
              spacing={{ base: 20, sm: 3, md: 5, lg: 20 }}
              justify={{ base: "center", lg: "start" }}
            >
              <WrapItem>
                <Box>
                  <Heading>Contact</Heading>
                  <Text mt={{ sm: 3, md: 3, lg: 5 }} color="gray.500">
                    Fill up the form below to contact
                  </Text>
                  <ContactInfo />
                  <HStack
                    mt={{ lg: 10, md: 10 }}
                    spacing={5}
                    px={5}
                    alignItems="flex-start"
                  >
                    <ContactIcon />
                  </HStack>
                </Box>
              </WrapItem>
              <WrapItem>
                <ContactForm />
              </WrapItem>
            </Wrap>
          </Box>
        </Box>
      </Flex>
    </Container>
  );
};
