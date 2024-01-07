import { FiChevronDown } from "react-icons/fi";
import {
  Avatar,
  Box,
  Button,
  Center,
  HStack,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Portal,
  Text,
  VStack,
} from "@chakra-ui/react";

import avatar4 from "~assets/img/avatars/avatar4.png";

import { UserData, UserRole } from "~types";

interface AuthMenuProps {
  user?: UserData | null;
  role?: UserRole | null;
  googleLogout: () => void;
}

export const AuthMenu = ({ user, role, googleLogout }: AuthMenuProps) => {
  return (
    <Menu>
      <MenuButton
        as={Button}
        py={2}
        transition="all 0.3s"
        _focus={{ boxShadow: "none" }}
        rounded={"full"}
        variant={"link"}
        cursor={"pointer"}
        minW={0}
      >
        <HStack>
          <Avatar
            size={"sm"}
            src={user?.picture ? user?.picture : avatar4}
            referrerPolicy="no-referrer"
          />
          <VStack
            display={{ base: "none", lg: "flex" }}
            alignItems="flex-start"
            spacing="1px"
            ml="2"
          >
            <Text fontSize="sm">{user?.username || "HelloTech69"}</Text>
            <Text fontSize="xs" color="gray.600">
              {role?.name || "User"}
            </Text>
          </VStack>
          <Box display={{ base: "none", lg: "flex" }}>
            <FiChevronDown />
          </Box>
        </HStack>
      </MenuButton>
      <Portal>
        <MenuList alignItems={"center"}>
          <br />
          <Center>
            <Avatar
              size={"2xl"}
              src={
                user?.picture
                  ? user?.picture
                  : "https://avatars.dicebear.com/api/male/username.svg"
              }
              referrerPolicy="no-referrer"
            />
          </Center>
          <br />
          <Center>
            <p>{user?.username}</p>
          </Center>
          <br />
          <MenuDivider />
          <MenuItem>Your Servers</MenuItem>
          <MenuItem>Account Settings</MenuItem>
          <MenuItem onClick={googleLogout}>Logout</MenuItem>
        </MenuList>
      </Portal>
    </Menu>
  );
};
