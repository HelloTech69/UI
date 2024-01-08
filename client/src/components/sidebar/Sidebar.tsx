import { FiLogOut } from "react-icons/fi";
import {
  Box,
  BoxProps,
  CloseButton,
  Flex,
  Icon,
  Stack,
  useColorModeValue as mode,
} from "@chakra-ui/react";

import { Logo } from "~components/logo/Logo";

import { LinkItems, NavItem } from "./index";

import { useAuth } from "~auth";

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

const Sidebar = ({ onClose, ...rest }: SidebarProps) => {
  const { isAuthenticated, googleLogout } = useAuth();

  return (
    <Box
      bg={mode("white", "gray.800")}
      borderRight="1px"
      borderRightColor={mode("gray.200", "gray.700")}
      w={{ base: "full", lg: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="full" direction="column" justifyContent="space-between">
        <Box>
          <Flex
            h="20"
            alignItems="center"
            mx="8"
            justifyContent="space-between"
          >
            <Logo destination={isAuthenticated ? "/dashboard" : "/"} />
            <CloseButton
              display={{ base: "flex", lg: "none" }}
              onClick={onClose}
            />
          </Flex>
          <Stack as={"nav"} spacing={3}>
            {LinkItems.map((link) => (
              <NavItem key={link.name} icon={link.icon} href={link.href}>
                {link.name}
              </NavItem>
            ))}
          </Stack>
        </Box>
        <Box
          style={{ textDecoration: "none" }}
          _focus={{ boxShadow: "none" }}
          as="button"
          onClick={googleLogout}
          mb={4}
        >
          <Flex
            align="center"
            p="4"
            mx="4"
            borderRadius="lg"
            role="group"
            cursor="pointer"
            _hover={{
              bg: "red.400",
              color: "white",
            }}
          >
            <Icon
              mr="4"
              fontSize="16"
              _groupHover={{
                color: "white",
              }}
              as={FiLogOut}
            />
            Logout
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};

export default Sidebar;
