import React from "react";
import { Flex, FlexProps } from "@chakra-ui/react";

interface CardProps extends FlexProps {
  icon: React.ReactNode;
}

export const IconBox: React.FC<CardProps> = (props) => {
  const { icon, ...rest } = props;

  return (
    <Flex
      alignItems={"center"}
      justifyContent={"center"}
      borderRadius={"50%"}
      {...rest}
    >
      {icon}
    </Flex>
  );
};
