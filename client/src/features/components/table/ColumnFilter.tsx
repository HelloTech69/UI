import React, { useState } from "react";
import { FaCheck, FaFilter, FaTimes } from "react-icons/fa";
import {
  HStack,
  IconButton,
  Input,
  Menu,
  MenuButton,
  MenuList,
  VStack,
} from "@chakra-ui/react";

import { ColumnButtonProps } from "~features/interfaces";

export const ColumnFilter: React.FC<ColumnButtonProps> = ({ column }) => {
  // eslint-disable-next-line
  const [state, setState] = useState(null as null | { value: any });

  if (!column.getCanFilter()) {
    return null;
  }

  const open = () =>
    setState({
      value: (column.getFilterValue() as string) || "",
    });

  const close = () => setState(null);

  // eslint-disable-next-line
  const change = (value: any) => setState({ value });

  const clear = () => {
    column.setFilterValue(undefined);
    close();
  };

  const save = () => {
    if (!state) return;
    column.setFilterValue(state.value);
    close();
  };

  const renderFilterElement = () => {
    // eslint-disable-next-line
    const FilterComponent = (column.columnDef?.meta as any)?.filterElement;

    if (!FilterComponent && !!state) {
      return (
        <Input
          borderRadius="md"
          size="sm"
          autoComplete="off"
          value={state.value}
          onChange={(event) => change(event.target.value)}
        />
      );
    }

    return (
      <FilterComponent
        value={state?.value}
        onChange={(event: any) => change(event.target.value)}
      />
    );
  };

  return (
    <Menu isOpen={!!state} onClose={close}>
      <MenuButton
        onClick={open}
        as={IconButton}
        aria-label="Options"
        icon={<FaFilter size="16" />}
        variant="ghost"
        size="xs"
      />
      <MenuList p="2">
        {!!state && (
          <VStack align="flex-start">
            {renderFilterElement()}
            <HStack spacing="1">
              <IconButton
                aria-label="Clear"
                size="sm"
                colorScheme="red"
                onClick={clear}
              >
                <FaTimes size={18} />
              </IconButton>
              <IconButton
                aria-label="Save"
                size="sm"
                onClick={save}
                colorScheme="green"
              >
                <FaCheck size={18} />
              </IconButton>
            </HStack>
          </VStack>
        )}
      </MenuList>
    </Menu>
  );
};
