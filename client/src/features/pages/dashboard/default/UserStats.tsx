import React, { ChangeEvent } from "react";
import {
  MdAddTask,
  MdAttachMoney,
  MdBarChart,
  MdFileCopy,
} from "react-icons/md";
import {
  Avatar,
  Box,
  Flex,
  FormLabel,
  Icon,
  Select,
  SimpleGrid,
  useColorModeValue,
} from "@chakra-ui/react";

import { MiniStatistics } from "~features/components/card";
import { IconBox } from "~features/components/icons/IconBox";

interface UserStatsProps {
  avatarSrc: string;
  selectedCurrency: string;
  handleCurrencyChange: (event: ChangeEvent<HTMLSelectElement>) => void;
}

export const UserStats: React.FC<UserStatsProps> = ({
  avatarSrc,
  selectedCurrency,
  handleCurrencyChange,
}) => {
  const brandColor = useColorModeValue("cyan.400", "white");
  const boxBg = useColorModeValue("secondaryGray.300", "blue.600");

  return (
    <SimpleGrid
      columns={{ base: 1, md: 2, lg: 3, "2xl": 6 }}
      gap="20px"
      mb="20px"
    >
      <MiniStatistics
        startContent={
          <IconBox
            w="56px"
            h="56px"
            bg={boxBg}
            icon={<Icon w="32px" h="32px" as={MdBarChart} color={brandColor} />}
          />
        }
        name="Earnings"
        value="$350.4"
      />
      <MiniStatistics
        startContent={
          <IconBox
            w="56px"
            h="56px"
            bg={boxBg}
            icon={
              <Icon w="32px" h="32px" as={MdAttachMoney} color={brandColor} />
            }
          />
        }
        name="Spend this month"
        value="$642.39"
      />
      <MiniStatistics growth="+23%" name="Sales" value="$574.34" />
      <MiniStatistics
        endContent={
          <Flex me="-16px" mt="10px">
            <FormLabel htmlFor="balance">
              <Avatar src={avatarSrc} />
            </FormLabel>
            <Box position="relative" width="30px">
              <Select
                id="balance"
                variant="mini"
                mt="5px"
                me="0px"
                onChange={handleCurrencyChange}
                value={selectedCurrency}
                opacity={0}
                position="absolute"
                width="full"
              >
                <option value="usd">USD</option>
                <option value="eur">EUR</option>
                <option value="chn">CHN</option>
              </Select>
              <Box position="absolute" right="0" top="5px" pointerEvents="none">
                <Box as="span" opacity={0}>
                  {selectedCurrency}
                </Box>
              </Box>
            </Box>
          </Flex>
        }
        name="Your balance"
        value="$1,000"
      />
      <MiniStatistics
        startContent={
          <IconBox
            w="56px"
            h="56px"
            bg="linear-gradient(90deg, #4481EB 0%, #04BEFE 100%)"
            icon={<Icon w="28px" h="28px" as={MdAddTask} color="white" />}
          />
        }
        name="New Tasks"
        value="154"
      />
      <MiniStatistics
        startContent={
          <IconBox
            w="56px"
            h="56px"
            bg={boxBg}
            icon={<Icon w="32px" h="32px" as={MdFileCopy} color={brandColor} />}
          />
        }
        name="Total Projects"
        value="2935"
      />
    </SimpleGrid>
  );
};

export default UserStats;
