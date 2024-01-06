import { MdUpgrade } from "react-icons/md";
import { Flex, Icon, Text, useColorModeValue as mode } from "@chakra-ui/react";

interface ItemContentProps {
  info: string;
  aName: string;
}

export const ItemContent = (props: ItemContentProps) => {
  const textColor = mode("navy.700", "white");
  return (
    <>
      <Flex
        justify="center"
        align="center"
        borderRadius="16px"
        minH={{ base: "60px", md: "70px" }}
        h={{ base: "60px", md: "70px" }}
        minW={{ base: "60px", md: "70px" }}
        w={{ base: "60px", md: "70px" }}
        me="14px"
        bg="linear-gradient(135deg, #868CFF 0%, #4318FF 100%)"
      >
        <Icon as={MdUpgrade} color="white" w={8} h={14} />
      </Flex>
      <Flex flexDirection="column">
        <Text
          mb="5px"
          fontWeight="bold"
          color={textColor}
          fontSize={{ base: "md", md: "md" }}
        >
          New Update: {props.info}
        </Text>
        <Flex alignItems="center">
          <Text
            fontSize={{ base: "sm", md: "sm" }}
            lineHeight="100%"
            color={textColor}
          >
            A new update for your downloaded item is available!
          </Text>
        </Flex>
      </Flex>
    </>
  );
};
