import { FC, useEffect, useState } from "react";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@chakra-ui/icons";
import {
  Flex,
  IconButton,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
  Text,
  Tooltip,
} from "@chakra-ui/react";

import { usePageStore } from "~shared/store";

type PaginationProps = {
  canPreviousPage: boolean;
  canNextPage: boolean;
  pageCount: number;
  pageIndex: number;
  setPageIndex: (updater: number | ((pageIndex: number) => number)) => void;
  nextPage: () => void;
  previousPage: () => void;
  setPageSize: (size: number) => void;
  pageSize: number;
};

export const Pagination: FC<PaginationProps> = ({
  canPreviousPage,
  canNextPage,
  pageCount,
  pageIndex,
  setPageIndex,
  nextPage,
  previousPage,
  setPageSize,
  pageSize,
}) => {
  const { setPostCurrentPage, setPostPageSize } = usePageStore();
  const [inputValue, setInputValue] = useState(String(pageIndex + 1));

  useEffect(() => {
    setInputValue(String(pageIndex + 1));
    setPostCurrentPage(pageIndex + 1);
  }, [pageIndex]);

  useEffect(() => {
    setPostPageSize(pageSize);
  }, [pageSize]);

  return (
    <Flex
      justifyContent="center"
      m={4}
      alignItems="center"
      direction={{ base: "column", lg: "row" }}
    >
      <Flex
        direction={{ base: "column", md: "row" }}
        alignItems="center"
        mr={3}
        mb={{ base: "2", lg: "0" }}
      >
        <Text
          flexShrink="0"
          mr={{ base: "0", md: "6" }}
          mb={{ base: "2", md: "0" }}
        >
          Page{" "}
          <Text fontWeight="bold" as="span">
            {pageIndex + 1}
          </Text>{" "}
          of{" "}
          <Text fontWeight="bold" as="span">
            {pageCount}
          </Text>
        </Text>
        <Flex alignItems="center">
          <Flex alignItems="center">
            <Text display={{ base: "none", sm: "flex" }} flexShrink="0">
              Go to page:
            </Text>{" "}
            <NumberInput
              ml={2}
              mr={4}
              w={28}
              min={1}
              max={pageCount}
              onChange={(valueString) => {
                setInputValue(valueString);
                if (valueString === "") return;
                const page = parseInt(valueString, 10) - 1;
                setPageIndex(page);
              }}
              value={inputValue}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </Flex>
          <Select
            w={32}
            value={pageSize}
            onChange={(event) => {
              setPageSize(Number(event.target.value));
            }}
          >
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </Select>
        </Flex>
      </Flex>
      <Flex>
        <Tooltip label="First Page">
          <IconButton
            aria-label="First Page"
            onClick={() => setPageIndex(0)}
            isDisabled={!canPreviousPage}
            icon={<ArrowLeftIcon h={3} w={3} />}
            mr={4}
          />
        </Tooltip>
        <Tooltip label="Previous Page">
          <IconButton
            aria-label="Previous Page"
            onClick={() => previousPage()}
            isDisabled={!canPreviousPage}
            icon={<ChevronLeftIcon h={6} w={6} />}
            mr={2}
          />
        </Tooltip>
        <Tooltip label="Next Page">
          <IconButton
            aria-label="Next Page"
            onClick={() => nextPage()}
            isDisabled={!canNextPage}
            icon={<ChevronRightIcon h={6} w={6} />}
          />
        </Tooltip>
        <Tooltip label="Last Page">
          <IconButton
            aria-label="Last Page"
            onClick={() => setPageIndex(pageCount - 1)}
            isDisabled={!canNextPage}
            icon={<ArrowRightIcon h={3} w={3} />}
            ml={4}
          />
        </Tooltip>
      </Flex>
    </Flex>
  );
};
