import React, { useEffect } from "react";
import { CgAddR } from "react-icons/cg";
import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue as mode,
} from "@chakra-ui/react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { usePageStore, usePostStore } from "~shared/store";

import makeData from "~features/components/data/MakeData";
import { Pagination } from "~features/components/pagination";
import { ColumnFilter, ColumnSorter } from "~features/components/table";
import { IPost } from "~features/interfaces";

import { usePostColumns } from "../index";

export const PostList: React.FC = () => {
  const { posts, setPosts } = usePostStore();
  const { postCurrentPage, postPageSize } = usePageStore();

  const columns: ColumnDef<IPost>[] = usePostColumns();

  const fetchAllPosts = async () => {
    // TODO: Replace the following with actual API call
    const data: IPost[] = makeData(100);
    setPosts(data);
  };

  const table = useReactTable({
    data: posts,
    columns,
    initialState: {
      sorting: [
        {
          id: "id",
          desc: false,
        },
      ],
      pagination: {
        pageIndex: postCurrentPage - 1,
        pageSize: postPageSize,
      },
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    debugTable: false,
    debugHeaders: false,
    debugColumns: false,
  });

  useEffect(() => {
    if (posts.length === 0) {
      fetchAllPosts();
    }
  }, []);

  const startIndex =
    table.getState().pagination.pageSize *
    table.getState().pagination.pageIndex;
  const endIndex = Math.min(
    startIndex + table.getState().pagination.pageSize,
    posts.length,
  );

  return (
    <Box p={4} bg={mode("white", "gray.800")}>
      <Flex justifyContent="space-between" m={4} alignItems="center">
        <Flex alignItems="center">
          <Heading as="h3" size="lg">
            Posts
          </Heading>
          <Text display={{ base: "none", sm: "inline" }} flexShrink="0" ml={4}>
            Showing{" "}
            <Text fontWeight="bold" as="span">
              {startIndex + 1}
            </Text>{" "}
            to{" "}
            <Text fontWeight="bold" as="span">
              {endIndex}
            </Text>{" "}
            of{" "}
            <Text fontWeight="bold" as="span">
              {posts.length}
            </Text>
          </Text>
        </Flex>
        <Flex>
          <Button
            as="a"
            href="/posts/create"
            leftIcon={<CgAddR />}
            colorScheme="blue"
          >
            Create
          </Button>
        </Flex>
      </Flex>
      <TableContainer>
        <Table variant="simple" whiteSpace="pre-line">
          <Thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <Tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <Th key={header.id}>
                      {!header.isPlaceholder && (
                        <HStack spacing="xs">
                          <Box>
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )}
                          </Box>
                          <HStack spacing="xs">
                            <ColumnSorter column={header.column} />
                            <ColumnFilter column={header.column} />
                          </HStack>
                        </HStack>
                      )}
                    </Th>
                  );
                })}
              </Tr>
            ))}
          </Thead>
          <Tbody>
            {table.getRowModel().rows.map((row) => {
              return (
                <Tr key={row.id}>
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <Td key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </Td>
                    );
                  })}
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
      <Pagination
        canPreviousPage={table.getCanPreviousPage()}
        canNextPage={table.getCanNextPage()}
        pageCount={table.getPageCount()}
        pageIndex={table.getState().pagination.pageIndex}
        pageSize={table.getState().pagination.pageSize}
        setPageIndex={table.setPageIndex}
        nextPage={table.nextPage}
        previousPage={table.previousPage}
        setPageSize={table.setPageSize}
      />
    </Box>
  );
};
