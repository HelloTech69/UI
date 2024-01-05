import { ReactElement } from "react";
import { Flex, Stack, Text } from "@chakra-ui/react";

interface AboutusItemProps {
  text: string;
  iconBg: string;
  icon?: ReactElement;
}

export const AboutusItem = ({ text, icon, iconBg }: AboutusItemProps) => {
  return (
    <Stack direction={"row"} align={"center"}>
      <Flex
        w={8}
        h={8}
        align={"center"}
        justify={"center"}
        rounded={"full"}
        bg={iconBg}
      >
        {icon}
      </Flex>
      <Text fontWeight={600}>{text}</Text>
    </Stack>
  );
};
