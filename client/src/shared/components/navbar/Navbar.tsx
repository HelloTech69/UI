import { FiBell, FiMenu } from "react-icons/fi";
import {
  Avatar,
  Box,
  Button,
  Center,
  Flex,
  FlexProps,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Portal,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";

import { Logo } from "~shared/components/logo/Logo";

import { useAuth } from "~features/auth";

interface NavProps extends FlexProps {
  onOpen: () => void;
}

interface Props {
  children: React.ReactNode;
}

const Links = ["Get Started", "About Us", "Features", "Contact Us"];

const NavLink = (props: Props) => {
  const { children } = props;

  return (
    <Box
      as="a"
      px={2}
      py={1}
      rounded={"md"}
      _hover={{
        textDecoration: "none",
        bg: useColorModeValue("gray.200", "gray.700"),
      }}
      href={"#"}
    >
      {children}
    </Box>
  );
};

const Navbar = ({ onOpen, ...rest }: NavProps) => {
  const { isAuthenticated, user, googleLogout } = useAuth();

  return (
    <Flex
      ml={isAuthenticated ? { base: 0, md: 60 } : 0}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue("white", "gray.900")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent={
        isAuthenticated
          ? { base: "space-between", md: "flex-end" }
          : "space-between"
      }
      {...rest}
    >
      <IconButton
        display={{ base: "flex", md: "none" }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />
      <Flex
        h="20"
        alignItems="center"
        display={isAuthenticated ? { base: "flex", md: "none" } : "flex"}
      >
        <Logo destination="/" />
        <HStack
          as={"nav"}
          ml={2}
          spacing={4}
          display={isAuthenticated ? "none" : { base: "none", md: "flex" }}
        >
          {Links.map((link) => (
            <NavLink key={link}>{link}</NavLink>
          ))}
        </HStack>
      </Flex>

      <HStack spacing={{ base: "0", md: "6" }}>
        {isAuthenticated ? (
          <IconButton
            size="lg"
            variant="ghost"
            aria-label="open menu"
            icon={<FiBell />}
          />
        ) : null}
        <Flex alignItems={"center"}>
          {isAuthenticated ? (
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
          ) : (
            <Stack
              flex={{ base: 1, md: 0 }}
              justify={"flex-end"}
              direction={"row"}
              spacing={6}
            >
              <Button
                as={"a"}
                fontSize={"sm"}
                fontWeight={400}
                variant={"link"}
                href={"/signin"}
                display={{ base: "none", md: "flex" }}
              >
                Sign In
              </Button>
              <Button
                as={"a"}
                fontSize={"sm"}
                fontWeight={600}
                color={"white"}
                bg={"green.400"}
                href={"/signup"}
                _hover={{
                  bg: "green.300",
                }}
              >
                Sign Un
              </Button>
            </Stack>
          )}
        </Flex>
      </HStack>
    </Flex>
  );
};

export default Navbar;
