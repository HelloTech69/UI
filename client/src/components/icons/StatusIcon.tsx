import { IconType } from "react-icons";
import { MdCancel, MdCheckCircle, MdOutlineError } from "react-icons/md";
import { Icon } from "@chakra-ui/react";

interface StatusIconProps {
  value: string;
}

interface statusStylesProps {
  [key: string]: {
    color: string;
    icon: IconType;
  };
}

const statusStyles: statusStylesProps = {
  published: { color: "green.500", icon: MdCheckCircle },
  draft: { color: "orange.500", icon: MdOutlineError },
  rejected: { color: "red.500", icon: MdCancel },
};

export const StatusIcon = ({ value }: StatusIconProps) => {
  const { color, icon } = statusStyles[value];

  return <Icon w="24px" h="24px" me="5px" color={color} as={icon} />;
};
