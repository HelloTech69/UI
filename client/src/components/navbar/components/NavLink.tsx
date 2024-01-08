import { Box, useColorModeValue as mode } from "@chakra-ui/react";

interface Props {
  href: string;
  children: React.ReactNode;
}

export const NavLink = ({ href, children }: Props) => {
  return (
    <Box
      as="a"
      px={2}
      py={1}
      rounded={"md"}
      _hover={{
        textDecoration: "none",
        bg: mode("gray.200", "gray.700"),
      }}
      href={href}
    >
      {children}
    </Box>
  );
};
