import { BsDiscord, BsGithub } from "react-icons/bs";
import { MdFacebook } from "react-icons/md";
import { IconButton } from "@chakra-ui/react";

export const ContactIcon = () => {
  return (
    <>
      <IconButton
        aria-label="facebook"
        variant="ghost"
        color="white"
        size="lg"
        isRound={true}
        _hover={{ bg: "#0D74FF" }}
        icon={<MdFacebook size="28px" />}
      />
      <IconButton
        aria-label="github"
        variant="ghost"
        color="white"
        size="lg"
        isRound={true}
        _hover={{ bg: "#0D74FF" }}
        icon={<BsGithub size="28px" />}
      />
      <IconButton
        aria-label="discord"
        variant="ghost"
        color="white"
        size="lg"
        isRound={true}
        _hover={{ bg: "#0D74FF" }}
        icon={<BsDiscord size="28px" />}
      />
    </>
  );
};
