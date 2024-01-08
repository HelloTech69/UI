import React from "react";
import { Box, BoxProps, useColorModeValue as mode } from "@chakra-ui/react";

interface CardProps extends BoxProps {
  children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ children, ...rest }) => {
  return (
    <Box
      p="20px"
      display="flex"
      flexDirection="column"
      width="100%"
      position="relative"
      borderRadius="20px"
      minWidth="0px"
      bg={mode("#ffffff", "navy.800")}
      backgroundClip="border-box"
      {...rest}
    >
      {children}
    </Box>
  );
};
