import "react-calendar/dist/Calendar.css";
import "~assets/style/MiniCalendar.css";

import { useState } from "react";
import Calendar, { CalendarProps } from "react-calendar";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { BoxProps, Icon, Text } from "@chakra-ui/react";

import { Card } from "~features/components/card";

interface MiniCalendarProp extends BoxProps {
  selectRange: boolean;
}

export const MiniCalendar = (props: MiniCalendarProp) => {
  const { selectRange, ...rest } = props;
  const [value, setValue] = useState(new Date());

  const handleDateChange = (newValue: CalendarProps["value"]) => {
    if (newValue instanceof Date) {
      setValue(newValue);
    } else if (Array.isArray(newValue) && newValue[0] instanceof Date) {
      setValue(newValue[0]);
    }
  };

  return (
    <Card
      alignItems="center"
      flexDirection="column"
      w="100%"
      maxW="max-content"
      p="20px 15px"
      h="max-content"
      {...rest}
    >
      <Calendar
        onChange={handleDateChange}
        value={value}
        selectRange={selectRange}
        view={"month"}
        tileContent={<Text color="blue.500"></Text>}
        prevLabel={<Icon as={MdChevronLeft} w="24px" h="24px" mt="4px" />}
        nextLabel={<Icon as={MdChevronRight} w="24px" h="24px" mt="4px" />}
      />
    </Card>
  );
};
