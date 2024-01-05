import { useState } from "react";
import {
  MdAddTask,
  MdAttachMoney,
  MdBarChart,
  MdFileCopy,
  MdRefresh,
} from "react-icons/md";
import {
  Avatar,
  Box,
  Button,
  Flex,
  FormLabel,
  Heading,
  Icon,
  Select,
  SimpleGrid,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

import { MiniStatistics } from "~shared/components/card";
import { IconBox } from "~shared/components/icons/IconBox";

import Chn from "~assets/img/dashboards/chn.png";
import Eur from "~assets/img/dashboards/eur.png";
import Usa from "~assets/img/dashboards/usa.png";

import { useAuth } from "~features/auth";

export default function MainDashboard() {
  const { user } = useAuth();
  const brandColor = useColorModeValue("cyan.400", "white");
  const boxBg = useColorModeValue("secondaryGray.300", "white");
  const [selectedCurrency, setSelectedCurrency] = useState("usd");
  const [avatarSrc, setAvatarSrc] = useState(Usa);

  const handleCurrencyChange = (event: any) => {
    const newCurrency = event.target.value;
    setSelectedCurrency(newCurrency);

    switch (newCurrency) {
      case "usd":
        setAvatarSrc(Usa);
        break;
      case "eur":
        setAvatarSrc(Eur);
        break;
      case "chn":
        setAvatarSrc(Chn);
        break;
      default:
        setAvatarSrc(Usa);
    }
  };

  return (
    <Box>
      <Box mb="20">
        <Heading h="1">Main Dashboard</Heading>
      </Box>
      <Flex justifyContent="space-between" alignItems="center">
        <Box>
          <Flex alignItems="center">
            <Box>
              <Text
                display="inline"
                flexShrink="0"
                fontWeight="bold"
                fontSize="lg"
              >
                Welcome back,{" "}
                <Text fontWeight="bold" as="span" color="cyan.400">
                  {user?.username || "HelloTech69"}
                </Text>
              </Text>
            </Box>
          </Flex>
        </Box>
        <Box>
          <Button
            leftIcon={<Icon as={MdRefresh} />}
            variant="outline"
            colorScheme="gray"
            size="md"
            mr="10px"
          >
            Refresh
          </Button>
          <Button
            leftIcon={<Icon as={MdAddTask} />}
            colorScheme="grey"
            size="md"
          >
            Add Task
          </Button>
        </Box>
      </Flex>
      <Box pt={{ base: "130px", md: "80px", xl: "40px" }}>
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
                icon={
                  <Icon w="32px" h="32px" as={MdBarChart} color={brandColor} />
                }
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
                  <Icon
                    w="32px"
                    h="32px"
                    as={MdAttachMoney}
                    color={brandColor}
                  />
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
                  <Box
                    position="absolute"
                    right="0"
                    top="5px"
                    pointerEvents="none"
                  >
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
                icon={
                  <Icon w="32px" h="32px" as={MdFileCopy} color={brandColor} />
                }
              />
            }
            name="Total Projects"
            value="2935"
          />
        </SimpleGrid>

        {/* <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap='20px' mb='20px'>
            <TotalSpent />
            <WeeklyRevenue />
          </SimpleGrid>
          <SimpleGrid columns={{ base: 1, md: 1, xl: 2 }} gap='20px' mb='20px'>
            <CheckTable columnsData={columnsDataCheck} tableData={tableDataCheck} />
            <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap='20px'>
              <DailyTraffic />
              <PieCard />
            </SimpleGrid>
          </SimpleGrid>
          <SimpleGrid columns={{ base: 1, md: 1, xl: 2 }} gap='20px' mb='20px'>
            <ComplexTable
              columnsData={columnsDataComplex}
              tableData={tableDataComplex}
            />
            <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap='20px'>
              <Tasks />
              <MiniCalendar h='100%' minW='100%' selectRange={false} />
            </SimpleGrid>
          </SimpleGrid> */}
      </Box>
    </Box>
  );
}
