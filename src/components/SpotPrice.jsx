"use client";

import { useEffect, useState } from "react";
import { TrendingUp } from "lucide-react";
import {
  ReferenceLine,
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
  YAxis,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";

const chartConfig = {
  yesterday: {
    label: "Eilen",
    color: "hsl(340, 70%, 53%)",
  },
  today: {
    label: "Tänään",
    color: "hsl(220, 70%, 50%)",
  },
};

export default function SpotPrice() {
  const [chartData, setChartData] = useState([]);
  useEffect(() => {
    fetch("http://192.168.1.106:3000/external-data")
      .then((response) => response.json())
      .then((data) => {
        if (data && Array.isArray(data)) {
          const formattedData = data.map(({ time, yesterday, today }) => ({
            time,
            yesterday,
            today,
          }));
          setChartData(formattedData);
          console.log(formattedData);
        }
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <Card className="bg-[#1B1B1B] border-none text-dark rounded-xl">
      <CardHeader>
        <CardTitle>Hinta nyt</CardTitle>
        <CardTitle>0.84 c/kWh</CardTitle>
      </CardHeader>
      <CardContent className="">
        <ChartContainer config={chartConfig} className="">
          <LineChart accessibilityLayer data={chartData} className="">
            <ReferenceLine x="15" stroke="gray" strokeDasharray="3 3" />
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="time"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <YAxis
              dataKey="today"
              width={20}
              tickLine={false}
              axisLine={false}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Line
              dataKey="today"
              type="natural"
              stroke="var(--color-today)"
              strokeWidth={2}
              dot={false}
            />
            <Line
              dataKey="yesterday"
              type="natural"
              stroke="var(--color-yesterday)"
              strokeWidth={2}
              dot={false}
            />

            <ChartLegend content={<ChartLegendContent />} height={5} />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="text-muted-foreground text-sm">
        Päivitetty 22:51
      </CardFooter>
    </Card>
  );
}
