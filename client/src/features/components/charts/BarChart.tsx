import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

import { barChartDataDailyTrafficProp } from "~data";

interface BarChartProps {
  chartData: barChartDataDailyTrafficProp[];
  chartOptions: ApexOptions;
}

export const BarChart = ({ chartOptions, chartData }: BarChartProps) => {
  return (
    <Chart
      options={chartOptions}
      series={chartData}
      type="bar"
      width="100%"
      height="100%"
    />
  );
};
