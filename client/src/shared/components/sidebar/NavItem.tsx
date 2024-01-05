import { IconType } from "react-icons";
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
  isActive: boolean;
  children: React.ReactNode;
}

export const NavItem = ({
  href,
  icon,
  isActive,
  children,
  ...rest
}: NavItemProps) => {
  return (
    <Box
      as="a"
      href={href}
      style={{ textDecoration: "none" }}
      _focus={{ boxShadow: "none" }}
    >
      <Flex
        align="center"
        p="3"
        role="group"
        cursor="pointer"
        _hover={{
          bg: mode("cyan.400", "blue.700"),
          color: mode("white", "blue.200"),
        }}
        bg={isActive ? mode("cyan.500", "blue.800") : undefined}
        color={isActive ? mode("white", "blue.200") : undefined}
        borderRight={isActive ? "4px solid" : undefined}
        borderRightColor={isActive ? mode("blue.500", "blue.200") : undefined}
        {...rest}
      >
        {icon && (
          <Icon
            mx="4"
            fontSize="16"
            _groupHover={{
              color: mode("white", "blue.200"),
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Box>
  );
};
