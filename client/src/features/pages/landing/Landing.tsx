import { useEffect } from "react";
import { Box } from "@chakra-ui/react";

import { useHead } from "~features/title/TitleContext";

import { Aboutus, Contact, Features, Hero } from "./index";

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
      <section id="getstarted">
        <Hero />
      </section>
      <section id="aboutus">
        <Aboutus />
      </section>
      <section id="features">
        <Features />
      </section>
      <section id="contactus">
        <Contact />
      </section>
    </Box>
  );
};

export default Landing;
