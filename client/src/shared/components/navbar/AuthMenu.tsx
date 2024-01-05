import {
  Avatar,
  Button,
  Center,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Portal,
} from "@chakra-ui/react";

import { useAuth } from "~features/auth";

export const AuthMenu = () => {
  const { user, googleLogout } = useAuth();

  return (
    <Menu>
      <MenuButton
        as={Button}
        rounded={"full"}
        variant={"link"}
        cursor={"pointer"}
        minW={0}
      >
        <Avatar
          size={"sm"}
          src={
            user?.picture
              ? user?.picture
              : "https://avatars.dicebear.com/api/male/username.svg"
          }
          referrerPolicy="no-referrer"
        />
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
