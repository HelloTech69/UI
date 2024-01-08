import { ChangeEvent, useEffect, useState } from "react";
import { Box, SimpleGrid } from "@chakra-ui/react";

import Chn from "~assets/img/dashboards/chn.png";
import Eur from "~assets/img/dashboards/eur.png";
import Usa from "~assets/img/dashboards/usa.png";

import { useAuth } from "~auth";
import { MiniCalendar } from "~components/calendar/Calendar";
import { useHead } from "~contexts/title/TitleContext";

import { DailyTraffic, Header, TotalSpent, UserStats } from "./index";

export default function Dashboard() {
  const { user } = useAuth();
  const updateHead = useHead();
  useEffect(() => {
    updateHead("Dashboard", {
      description: "Dashboard",
      keywords: "Dashboard",
    });
  }, []);

  const [selectedCurrency, setSelectedCurrency] = useState("usd");
  const [avatarSrc, setAvatarSrc] = useState(Usa);

  const handleCurrencyChange = (event: ChangeEvent<HTMLSelectElement>) => {
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
      <Header user={user} />
      <Box pt={{ base: "130px", md: "80px", xl: "40px" }}>
        <UserStats
          avatarSrc={avatarSrc}
          selectedCurrency={selectedCurrency}
          handleCurrencyChange={handleCurrencyChange}
        />

        <SimpleGrid columns={{ base: 1, md: 1, xl: 2 }} gap="20px" mb="20px">
          <TotalSpent />
          <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap="20px">
            <DailyTraffic px="1" />
            <MiniCalendar h="100%" minW="100%" selectRange={false} />
          </SimpleGrid>
        </SimpleGrid>
        {/* <SimpleGrid columns={{ base: 1, md: 1, xl: 2 }} gap='20px' mb='20px'>
          <CheckTable columnsData={columnsDataCheck} tableData={tableDataCheck} />
          <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap='20px'>
            <Tasks />
            <PieCard />
          </SimpleGrid>
        </SimpleGrid>
        <SimpleGrid columns={{ base: 1, md: 1, xl: 2 }} gap='20px' mb='20px'>
          <ComplexTable
            columnsData={columnsDataComplex}
            tableData={tableDataComplex}
          />
          <WeeklyRevenue />
        </SimpleGrid> */}
      </Box>
    </Box>
  );
}
