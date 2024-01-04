import { useEffect, useState } from "react";
import { DeleteIcon, EditIcon, ViewIcon } from "@chakra-ui/icons";
import {
  Button,
  ButtonGroup,
  HStack,
  IconButton,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  Select,
  Tooltip,
  useToast,
} from "@chakra-ui/react";
import { ColumnDef } from "@tanstack/react-table";

import { useCategoryStore, usePostStore } from "~shared/store";

import { getAllCategories } from "~features/components/data";
import {
  customCategoryFilter,
  customCreatedAtSorter,
} from "~features/components/table";
import { FilterElementProps, IPost } from "~features/interfaces";

export const usePostColumns = (): ColumnDef<IPost>[] => {
  const toast = useToast();
  const [activePopoverId, setActivePopoverId] = useState<number | null>(null);
  const { removePost } = usePostStore();
  const { categories, setCategories } = useCategoryStore();

  const handleDelete = (id: number) => {
    setActivePopoverId(id);
  };

  const onDelete = () => {
    // TODO: Add actual API call to remove post from database
    removePost(activePopoverId as number);
    toast({ title: `Post deleted ${activePopoverId}`, status: "error" });
    setActivePopoverId(null);
  };

  const fetchAllCategories = async () => {
    // TODO: Replace with actual API call

    setCategories(getAllCategories);
  };

  useEffect(() => {
    if (categories.length === 0) {
      fetchAllCategories();
    }
  }, []);

  return [
    {
      id: "id",
      accessorKey: "id",
      header: "ID",
      enableColumnFilter: false,
    },
    {
      id: "title",
      accessorKey: "title",
      header: "Title",
      meta: {
        filterOperator: "contains",
      },
    },
    {
      id: "status",
      accessorKey: "status",
      header: "Status",
      meta: {
        filterElement: function render(props: FilterElementProps) {
          return (
            <Select
              borderRadius="md"
              size="sm"
              placeholder="All Status"
              {...props}
            >
              <option value="published">published</option>
              <option value="draft">draft</option>
              <option value="rejected">rejected</option>
            </Select>
          );
        },
        filterOperator: "eq",
      },
    },
    {
      id: "category.id",
      accessorKey: "category.id",
      header: "Category",
      meta: {
        filterElement: function render(props: FilterElementProps) {
          return (
            <Select
              borderRadius="md"
              size="sm"
              placeholder="All Category"
              {...props}
            >
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.title}
                </option>
              ))}
            </Select>
          );
        },
        filterOperator: "eq",
      },
      filterFn: customCategoryFilter,
      cell: function render({ cell: { getValue } }) {
        const categoryId = getValue() as number;
        const categoryObject = getAllCategories.find(
          (category) => category.id === categoryId,
        );

        return categoryObject ? categoryObject.title : "Unknown Category";
      },
    },
    {
      id: "createdAt",
      accessorKey: "createdAt",
      header: "Created At",
      enableColumnFilter: false,
      sortingFn: customCreatedAtSorter,
      cell: (info) => {
        const dateValue = info.getValue() as string;

        if (!dateValue || isNaN(new Date(dateValue).getTime())) {
          return "Invalid date";
        }

        return dateValue;
      },
    },
    {
      id: "actions",
      header: "Actions",
      accessorKey: "id",
      enableColumnFilter: false,
      enableSorting: false,
      cell: (info) => (
        <HStack>
          <Tooltip hasArrow label="View Post" bg="gray.300" color="black">
            <IconButton
              aria-label="View"
              as="a"
              icon={<ViewIcon />}
              href={`/posts/show/${info.row.original.id}`}
              variant="outline"
            />
          </Tooltip>
          <Tooltip hasArrow label="Edit Post" bg="blue.600">
            <IconButton
              aria-label="Edit"
              as="a"
              icon={<EditIcon />}
              href={`/posts/edit/${info.row.original.id}`}
              variant="outline"
            />
          </Tooltip>
          <Popover
            returnFocusOnClose={false}
            isOpen={activePopoverId === info.row.original.id}
            onClose={() => setActivePopoverId(null)}
            placement="bottom"
            closeOnBlur={false}
          >
            <PopoverTrigger>
              <IconButton
                aria-label="Delete"
                icon={<DeleteIcon />}
                onClick={() => handleDelete(info.row.original.id)}
                variant="outline"
                colorScheme="red"
              />
            </PopoverTrigger>
            <PopoverContent textAlign="center">
              <PopoverHeader fontWeight="semibold">Confirmation</PopoverHeader>
              <PopoverArrow />
              <PopoverCloseButton />
              <PopoverBody>Are you sure?</PopoverBody>
              <PopoverFooter display="flex" justifyContent="center">
                <ButtonGroup size="sm">
                  <Button
                    variant="outline"
                    onClick={() => setActivePopoverId(null)}
                  >
                    Cancel
                  </Button>
                  <Button colorScheme="red" onClick={onDelete}>
                    Apply
                  </Button>
                </ButtonGroup>
              </PopoverFooter>
            </PopoverContent>
          </Popover>
        </HStack>
      ),
    },
  ];
};
