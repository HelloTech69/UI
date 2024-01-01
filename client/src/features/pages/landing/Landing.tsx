import { useEffect } from "react";
import { Box } from "@chakra-ui/react";

import { useHead } from "~features/title/TitleContext";

import Cards from "./cards/Cards";
import Contact from "./contact/Contact";
import Features from "./features/Features";
import Hero from "./hero/Hero";

const Landing = () => {
  const updateHead = useHead();
  useEffect(() => {
    updateHead("Home", {
      description: "Home",
      keywords: "Home",
    });
  }, []);

  return (
    <Box width="100%">
      <Hero />
      <Features />
      <Cards />
      <Contact />
    </Box>
  );
};

export default Landing;
