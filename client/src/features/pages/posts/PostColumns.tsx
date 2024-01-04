import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
  useToast,
} from "@chakra-ui/react";
import { ColumnDef, FilterFn } from "@tanstack/react-table";

import { useCategoryStore, usePostStore } from "~shared/store";

import { getAllCategories } from "~features/components/data";
import { FilterElementProps, IPost } from "~features/interfaces";

export const usePostColumns = (): ColumnDef<IPost>[] => {
  const navigate = useNavigate();
  const toast = useToast();
  const [activePopoverId, setActivePopoverId] = useState<number | null>(null);
  const { removePost } = usePostStore();
  const { categories, setCategories } = useCategoryStore();

  const handleEdit = (id: number) => {
    navigate(`/posts/edit/${id}`);
  };

  const handleView = (id: number) => {
    navigate(`/posts/show/${id}`);
  };

  const handleDelete = (id: number) => {
    setActivePopoverId(id);
  };

  const onDelete = () => {
    // TODO: Add actual API call to remove post from database
    removePost(activePopoverId as number);
    toast({ title: `Post deleted ${activePopoverId}`, status: "error" });
    setActivePopoverId(null);
  };

  const customCategoryFilter: FilterFn<any> = (row, columnId, filterValue) => {
    const rowValue = Number(row.getValue(columnId));
    const filterNumber = Number(filterValue);
    return rowValue === filterNumber;
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
          <IconButton
            aria-label="View"
            icon={<ViewIcon />}
            onClick={() => handleView(info.row.original.id)}
            variant="outline"
          />
          <IconButton
            aria-label="Edit"
            icon={<EditIcon />}
            onClick={() => handleEdit(info.row.original.id)}
            variant="outline"
          />

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
            <PopoverContent>
              <PopoverHeader fontWeight="semibold">Confirmation</PopoverHeader>
              <PopoverArrow />
              <PopoverCloseButton />
              <PopoverBody>Are you sure?</PopoverBody>
              <PopoverFooter display="flex" justifyContent="flex-end">
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
