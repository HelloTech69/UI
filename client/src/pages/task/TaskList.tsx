import { useEffect } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import {
  Box,
  Container,
  Heading,
  SimpleGrid,
  useColorModeValue as mode,
} from "@chakra-ui/react";

import { ColumnType } from "~utils";

import { useHead } from "~contexts/title/TitleContext";

import Column from "./components/Column";

export default function TaskList() {
  const updateHead = useHead();
  useEffect(() => {
    updateHead("TaskList", {
      description: "TaskList",
      keywords: "TaskList",
    });
  }, []);
  return (
    <Box p={4} bg={mode("white", "gray.800")}>
      <Heading
        fontSize={{ base: "4xl", sm: "5xl", md: "6xl" }}
        fontWeight="bold"
        textAlign="center"
        bg="blue.400"
        bgClip="text"
        mt={4}
      >
        Tasks
      </Heading>
      <DndProvider backend={HTML5Backend}>
        <Container maxWidth="container.lg" px={4} py={10}>
          <SimpleGrid
            columns={{ base: 1, md: 2, xl: 4 }}
            spacing={{ base: 16, md: 4 }}
          >
            <Column column={ColumnType.BLOCKED} />
            <Column column={ColumnType.TO_DO} />
            <Column column={ColumnType.IN_PROGRESS} />
            <Column column={ColumnType.COMPLETED} />
          </SimpleGrid>
        </Container>
      </DndProvider>
    </Box>
  );
}
