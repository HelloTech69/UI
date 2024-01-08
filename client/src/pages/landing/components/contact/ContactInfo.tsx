import { MdEmail, MdLocationOn, MdPhone } from "react-icons/md";
import { Box, Button, VStack } from "@chakra-ui/react";

export const ContactInfo = () => {
  return (
    <Box py={{ base: 5, sm: 5, md: 8, lg: 10 }}>
      <VStack pl={0} spacing={3} alignItems="flex-start">
        <Button
          size="md"
          height="48px"
          width="200px"
          variant="ghost"
          color="#DCE2FF"
          _hover={{ border: "2px solid #1C6FEB" }}
          leftIcon={<MdPhone color="#1970F1" size="20px" />}
        >
          +91-988888888
        </Button>
        <Button
          size="md"
          height="48px"
          width="200px"
          variant="ghost"
          color="#DCE2FF"
          _hover={{ border: "2px solid #1C6FEB" }}
          leftIcon={<MdEmail color="#1970F1" size="20px" />}
        >
          hello@abc.com
        </Button>
        <Button
          size="md"
          height="48px"
          width="200px"
          variant="ghost"
          color="#DCE2FF"
          _hover={{ border: "2px solid #1C6FEB" }}
          leftIcon={<MdLocationOn color="#1970F1" size="20px" />}
        >
          Seoul, Korea
        </Button>
      </VStack>
    </Box>
  );
};
