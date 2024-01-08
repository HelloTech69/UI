import { MdAddTask, MdRefresh } from "react-icons/md";
import {
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  Text,
  useColorModeValue as mode,
} from "@chakra-ui/react";

import { UserData } from "~types";

interface HeaderProps {
  user?: UserData | null;
}

export const Header = ({ user }: HeaderProps) => {
  return (
    <>
      <Box mb="20">
        <Heading h="1">Main Dashboard</Heading>
      </Box>
      <Flex
        direction={{ base: "column", sm: "row" }}
        justifyContent="space-between"
        alignItems="center"
      >
        <Box>
          <Flex alignItems="center">
            <Box>
              <Text
                display="inline"
                flexShrink="0"
                fontWeight="bold"
                fontSize="lg"
              >
                Welcome back,{" "}
                <Text
                  fontWeight="bold"
                  as="span"
                  color={mode("cyan.400", "blue.500")}
                >
                  {user?.username || "HelloTech69"}
                </Text>
              </Text>
            </Box>
          </Flex>
        </Box>
        <Box>
          <Button
            leftIcon={<Icon as={MdRefresh} />}
            variant="outline"
            colorScheme="gray"
            size="md"
            mr="10px"
          >
            Refresh
          </Button>
          <Button
            leftIcon={<Icon as={MdAddTask} />}
            colorScheme="grey"
            size="md"
          >
            Add Task
          </Button>
        </Box>
      </Flex>
    </>
  );
};
