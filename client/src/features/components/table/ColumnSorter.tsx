import { FaCaretDown, FaChevronDown, FaChevronUp } from "react-icons/fa";
import { IconButton } from "@chakra-ui/react";
import type { SortDirection } from "@tanstack/react-table";

import { ColumnButtonProps } from "~features/interfaces";

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
