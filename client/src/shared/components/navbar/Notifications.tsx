import { BellIcon } from "@chakra-ui/icons";
import {
  Flex,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useColorModeValue as mode,
} from "@chakra-ui/react";

import { ItemContent } from "./index";

export const Notifications = () => {
  const shadow = mode(
    "14px 17px 40px 4px rgba(112, 144, 176, 0.18)",
    "14px 17px 40px 4px rgba(112, 144, 176, 0.06)",
  );
  const menuBg = mode("white", "blue.800");
  const textColor = mode("secondaryGray.900", "white");
  const textColorBrand = mode("blue.700", "blue.400");
  return (
    <Menu>
      <MenuButton p="0px">
        <Icon
          w="18px"
          h="18px"
          mr="3"
          display={{ base: "none", sm: "flex" }}
          as={BellIcon}
        />
      </MenuButton>
      <MenuList
        boxShadow={shadow}
        p="20px"
        borderRadius="20px"
        bg={menuBg}
        border="none"
        mt="22px"
        me={{ base: "30px", md: "unset" }}
        minW={{ base: "unset", md: "400px", xl: "450px" }}
        maxW={{ base: "360px", md: "unset" }}
      >
        <Flex justifyContent="space-between" w="100%" mb="20px">
          <Text fontSize="md" fontWeight="600" color={textColor}>
            Notifications
          </Text>
          <Text
            fontSize="sm"
            fontWeight="500"
            color={textColorBrand}
            ms="auto"
            cursor="pointer"
          >
            Mark all read
          </Text>
        </Flex>
        <Flex flexDirection="column">
          <MenuItem
            _hover={{ bg: "blue.400" }}
            _focus={{ bg: "blue.400" }}
            bg="none"
            p="5px"
            borderRadius="8px"
            mb="10px"
          >
            <ItemContent info="Horizon UI Dashboard PRO" aName="Alicia" />
          </MenuItem>
          <MenuItem
            _hover={{ bg: "blue.400" }}
            _focus={{ bg: "blue.400" }}
            p="5px"
            bg="none"
            borderRadius="8px"
            mb="10px"
          >
            <ItemContent info="Horizon Design System Free" aName="Josh Henry" />
          </MenuItem>
        </Flex>
      </MenuList>
    </Menu>
  );
};
