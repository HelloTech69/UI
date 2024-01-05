import { BsPerson } from "react-icons/bs";
import { MdOutlineEmail } from "react-icons/md";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  Textarea,
  VStack,
} from "@chakra-ui/react";

export const ContactForm = () => {
  return (
    <Box bg="white" borderRadius="lg">
      <Box m={8} color="#0B0E3F">
        <VStack spacing={5}>
          <FormControl id="name">
            <FormLabel>Your Name</FormLabel>
            <InputGroup borderColor="#E0E1E7">
              <InputLeftElement pointerEvents="none">
                <BsPerson color="gray.800" />
              </InputLeftElement>
              <Input type="text" size="md" />
            </InputGroup>
          </FormControl>
          <FormControl id="email">
            <FormLabel>Mail</FormLabel>
            <InputGroup borderColor="#E0E1E7">
              <InputLeftElement pointerEvents="none">
                <MdOutlineEmail color="gray.800" />
              </InputLeftElement>
              <Input type="text" size="md" />
            </InputGroup>
          </FormControl>
          <FormControl id="message">
            <FormLabel>Message</FormLabel>
            <Textarea
              borderColor="gray.300"
              _hover={{
                borderRadius: "gray.300",
              }}
              placeholder="message"
            />
          </FormControl>
          <FormControl id="name" float="right">
            <Button variant="solid" bg="#0D74FF" color="white" _hover={{}}>
              Send Message
            </Button>
          </FormControl>
        </VStack>
      </Box>
    </Box>
  );
};
