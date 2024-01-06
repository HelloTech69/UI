import { RiArrowUpSFill } from "react-icons/ri";
import {
  Box,
  BoxProps,
  Flex,
  Icon,
  Text,
  useColorModeValue as mode,
} from "@chakra-ui/react";

import { Card } from "~features/components/card";
import { BarChart } from "~features/components/charts";

import { barChartDataDailyTraffic, barChartOptionsDailyTraffic } from "~data";

export const DailyTraffic = (props: BoxProps) => {
  const { ...rest } = props;

  const textColor = mode("secondaryGray.900", "white");
  return (
    <Card alignItems="center" flexDirection="column" w="100%" {...rest}>
      <Flex justifyContent="space-between" alignItems="start" px="0px" pt="5px">
        <Flex direction="column" alignItems="start" me="20px">
          <Flex w="100%">
            <Text
              me="auto"
              color="secondaryGray.600"
              fontSize="sm"
              fontWeight="500"
            >
              Daily Traffic
            </Text>
          </Flex>
          <Flex align="end">
            <Text
              color={textColor}
              fontSize="34px"
              fontWeight="700"
              lineHeight="100%"
            >
              2.579
            </Text>
            <Text
              ms="6px"
              color="secondaryGray.600"
              fontSize="sm"
              fontWeight="500"
            >
              Visitors
            </Text>
          </Flex>
        </Flex>
        <Flex align="center">
          <Icon as={RiArrowUpSFill} color="green.500" />
          <Text color="green.500" fontSize="sm" fontWeight="700">
            +2.45%
          </Text>
        </Flex>
      </Flex>
      <Box h="240px" mt="auto">
        <BarChart
          chartData={barChartDataDailyTraffic}
          chartOptions={barChartOptionsDailyTraffic}
        />
      </Box>
    </Card>
  );
};
