import React, { useEffect, useState } from "react";
import { CgAddR } from "react-icons/cg";
import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Spinner,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
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

import makeData from "~features/components/data/MakeData";
import { Pagination } from "~features/components/pagination";
import { ColumnFilter, ColumnSorter } from "~features/components/table";
import { IPost } from "~features/interfaces";

import { usePostColumns } from "./index";

export const PostList: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState<IPost[]>([]);

  const columns: ColumnDef<IPost>[] = usePostColumns();

  useEffect(() => {
    const fetchAllPosts = async () => {
      // Replace the following with actual API call
      const data: IPost[] = makeData(1000);
      setPosts(data);
      setIsLoading(false);
    };
    fetchAllPosts();
  }, []);

  const table = useReactTable({
    data: posts,
    columns,
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

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <Box p="4" bg="white">
      <Flex justifyContent="space-between" m={4} alignItems="center">
        <Flex alignItems="center">
          <Heading as="h3" size="lg">
            Posts
          </Heading>
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
