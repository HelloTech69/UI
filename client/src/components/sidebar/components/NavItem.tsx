import { IconType } from "react-icons";
import { NavLink as RouterLink } from "react-router-dom";
import {
  Box,
  Flex,
  FlexProps,
  Icon,
  useColorModeValue as mode,
} from "@chakra-ui/react";

interface NavItemProps extends FlexProps {
  icon: IconType;
  href: string;
  children: React.ReactNode;
}

export const NavItem = ({ href, icon, children, ...rest }: NavItemProps) => {
  const hoverBg = mode("cyan.400", "blue.700");
  const hoverColor = mode("white", "blue.200");
  const activeBg = mode("cyan.500", "blue.800");
  const activeColor = mode("white", "blue.200");
  const activeBorderRightColor = mode("blue.500", "blue.200");
  const iconColor = mode("white", "blue.200");

  return (
    <Box
      as={RouterLink}
      to={href}
      style={{ textDecoration: "none" }}
      _focus={{ boxShadow: "none" }}
    >
      {({ isActive }: { isActive: boolean }) => (
        <Flex
          align="center"
          p="3"
          role="group"
          cursor="pointer"
          _hover={{
            bg: hoverBg,
            color: hoverColor,
          }}
          bg={isActive ? activeBg : undefined}
          color={isActive ? activeColor : undefined}
          borderRight={isActive ? "4px solid" : undefined}
          borderRightColor={isActive ? activeBorderRightColor : undefined}
          {...rest}
        >
          {icon && (
            <Icon
              mx="4"
              fontSize="16"
              _groupHover={{
                color: iconColor,
              }}
              as={icon}
            />
          )}
          {children}
        </Flex>
      )}
    </Box>
  );
};
