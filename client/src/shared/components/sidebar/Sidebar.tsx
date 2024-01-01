import { IconType } from "react-icons";
import { FiCompass, FiSettings, FiStar, FiTrendingUp } from "react-icons/fi";
import { RxDashboard } from "react-icons/rx";
import {
  Box,
  BoxProps,
  CloseButton,
  Flex,
  FlexProps,
  Stack,
  Icon,
  useColorModeValue,
} from "@chakra-ui/react";

import { Logo } from "~shared/components/logo/Logo";

import { useAuth } from "~features/auth";

interface LinkItemProps {
  name: string;
  icon: IconType;
}

interface NavItemProps extends FlexProps {
  icon: IconType;
  children: React.ReactNode;
}

interface SidebarProps extends BoxProps {
  onClose: () => void;
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

const LinkItems: Array<LinkItemProps> = [
  { name: "Dashboard", icon: RxDashboard },
  { name: "Trending", icon: FiTrendingUp },
  { name: "Explore", icon: FiCompass },
  { name: "Favourites", icon: FiStar },
  { name: "Settings", icon: FiSettings },
];

const NavItem = ({ icon, children, ...rest }: NavItemProps) => {
  return (
    <Box
      as="a"
      href="#"
      style={{ textDecoration: "none" }}
      _focus={{ boxShadow: "none" }}
    >
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: "cyan.400",
          color: "white",
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: "white",
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Box>
  );
};

const Sidebar = ({ onClose, ...rest }: SidebarProps) => {
  const { isAuthenticated } = useAuth();

  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Logo destination={isAuthenticated ? "/dashboard" : "/"} />
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      {isAuthenticated
        ? LinkItems.map((link) => (
            <NavItem key={link.name} icon={link.icon}>
              {link.name}
            </NavItem>
          ))
        : <Box pb={4} display={{ md: 'none' }} mx="8">
        <Stack as={'nav'} spacing={4}>
          {Links.map((link) => (
            <NavLink key={link}>{link}</NavLink>
          ))}
        </Stack>
      </Box>}
    </Box>
  );
};

export default Sidebar;
