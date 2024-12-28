import { Bar, BarChart, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

function BarChartView({ options, title, description }) {
  // Generate chart data dynamically based on options
  const chartData = options.map((option, index) => ({
    browser: option.option,
    selected: option.count,
    fill: `hsl(var(--chart-${index + 1}))`,
  }));

  const chartConfig = chartData.reduce((config, item, index) => {
    config[item.browser] = {
      label: item.browser,
      color: item.fill,
    };
    return config;
  }, {});

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title || "Bar Chart"}</CardTitle>
        <CardDescription>{description || "Dynamic Data"}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            width={'100%'} 
            height={'100%'}
            data={chartData}
            layout="vertical"
            margin={{
              left: 0,
            }}
          >
            <YAxis
              dataKey="browser"
              type="category"
              tickLine={false}
              tickMargin={2}
              axisLine={false}
              tickFormatter={(value) => chartConfig[value]?.label}
            />
            <XAxis dataKey="selected" type="number" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="selected" layout="vertical" radius={5} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

export default BarChartView;
