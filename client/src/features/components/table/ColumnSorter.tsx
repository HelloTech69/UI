import { FaCaretDown, FaChevronDown, FaChevronUp } from "react-icons/fa";
import { IconButton } from "@chakra-ui/react";
import type { SortDirection, SortingFn } from "@tanstack/react-table";

import { ColumnButtonProps } from "~features/interfaces";

// eslint-disable-next-line
export const customCreatedAtSorter: SortingFn<any> = (rowA, rowB, columnId) => {
  const rowAValue = rowA.getValue(columnId) as string;
  const rowBValue = rowB.getValue(columnId) as string;

  const dateA = new Date(rowAValue).getTime();
  const dateB = new Date(rowBValue).getTime();

  if (isNaN(dateA)) return -1;
  if (isNaN(dateB)) return 1;

  return dateA - dateB;
};

export const ColumnSorter: React.FC<ColumnButtonProps> = ({ column }) => {
  if (!column.getCanSort()) {
    return null;
  }

  const sorted = column.getIsSorted();

  return (
    <IconButton
      aria-label="Sort"
      size="xs"
      onClick={column.getToggleSortingHandler()}
      icon={<ColumnSorterIcon sorted={sorted} />}
      variant={sorted ? "light" : "transparent"}
      color={sorted ? "primary" : "gray"}
    />
  );
};

const ColumnSorterIcon = ({ sorted }: { sorted: false | SortDirection }) => {
  if (sorted === "asc") return <FaChevronDown size={18} />;
  if (sorted === "desc") return <FaChevronUp size={18} />;
  return <FaCaretDown size={18} />;
};
