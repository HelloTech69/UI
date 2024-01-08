import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

import { lineChartDataTotalSpentProp } from "~data";

interface LineChartProps {
  chartData: lineChartDataTotalSpentProp[];
  chartOptions: ApexOptions;
}

export const LineChart = ({ chartOptions, chartData }: LineChartProps) => {
  return (
    <ReactApexChart
      options={chartOptions}
      series={chartData}
      type="line"
      width="100%"
      height="100%"
    />
  );
};
