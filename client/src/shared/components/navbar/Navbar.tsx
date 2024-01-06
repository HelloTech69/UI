import { useState } from "react";
import { CloseIcon, HamburgerIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  FlexProps,
  HStack,
  IconButton,
  Stack,
  useColorMode,
  useColorModeValue as mode,
} from "@chakra-ui/react";

import { Logo } from "~shared/components/logo/Logo";

import { useAuth } from "~features/auth";

import { AuthMenu, Links, NavLink, Notifications } from "./index";

interface NavProps extends FlexProps {
  onOpen: () => void;
}

const Navbar = ({ onOpen, ...rest }: NavProps) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isAuthenticated, user, googleLogout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = () => setIsOpen(true);
  const toggleClose = () => setIsOpen(false);

  const getIcon = () => {
    if (isAuthenticated) {
      return <HamburgerIcon />;
    } else if (isOpen) {
      return <CloseIcon />;
    } else {
      return <HamburgerIcon />;
    }
  };

  const handleIconButtonClick = () => {
    if (isAuthenticated) {
      onOpen();
    } else {
      isOpen ? toggleClose() : toggleOpen();
    }
  };

  return (
    <Box
      ml={isAuthenticated ? { base: 0, lg: 60 } : 0}
      px={{ base: 4, lg: 4 }}
      height="20"
      position="sticky"
      top={0}
      zIndex={1}
      bg={mode("white", "gray.800")}
      borderBottomWidth="1px"
      borderBottomColor={mode("gray.200", "gray.700")}
    >
      <Flex
        alignItems="center"
        justifyContent={
          isAuthenticated
            ? { base: "space-between", lg: "flex-end" }
            : "space-between"
        }
        {...rest}
      >
        <IconButton
          display={{ base: "flex", lg: "none" }}
          onClick={handleIconButtonClick}
          variant="outline"
          aria-label="open menu"
          icon={getIcon()}
        />
        <Flex
          h="20"
          alignItems="center"
          display={isAuthenticated ? { base: "flex", lg: "none" } : "flex"}
        >
          <Logo destination="/" />
          <HStack
            as={"nav"}
            ml={2}
            spacing={4}
            display={isAuthenticated ? "none" : { base: "none", lg: "flex" }}
          >
            {Links.map((link) => (
              <NavLink key={link.name} href={link.href}>
                {link.name}
              </NavLink>
            ))}
          </HStack>
        </Flex>

        <Flex h="20" alignItems="center">
          <IconButton
            aria-label="toggleMode"
            size="lg"
            mx="2"
            variant="ghost"
            onClick={toggleColorMode}
            icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
          />
          {isAuthenticated ? (
            <>
              <Notifications />
              <AuthMenu user={user} googleLogout={googleLogout} />
            </>
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
                display={{ base: "none", lg: "flex" }}
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
                Sign Up
              </Button>
            </Stack>
          )}
        </Flex>
      </Flex>
      {isOpen ? (
        <Box pb={4} display={{ lg: "none" }}>
          <Stack as={"nav"} spacing={4}>
            {Links.map((link) => (
              <NavLink key={link.name} href={link.href}>
                {link.name}
              </NavLink>
            ))}
          </Stack>
        </Box>
      ) : null}
    </Box>
  );
};

export default Navbar;
