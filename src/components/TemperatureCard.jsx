"use client";

import { TrendingUp } from "lucide-react";
import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts";

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
} from "@/components/ui/chart";

const chartData = [
  { room: "Olohuone", temperature: 21.5, leftover: 18.5 },
  { room: "Makuuhuone", temperature: 12.3, leftover: 27.7 },
  { room: "Keittiö", temperature: 28.8, leftover: 11.2 },
];

const chartConfig = {
  temperature: {
    label: "temperature",
    color: "hsl(var(--chart-1))",
  },
  leftover: {
    label: "leftover",
    color: "hsl(var(--chart-2))",
  },
};

export default function TemperatureCard({ roomName }) {
  const roomData = chartData.find((data) => data.room === roomName);

  return (
    <Card className="flex flex-col rounded-xl bg-[#1B1B1B] border-none text-dark h-[200px] w-[215px]">
      <CardHeader className="items-center ">
        <CardTitle className="">{roomName}</CardTitle>
      </CardHeader>
      <CardContent className="flex items-center justify-center">
        <ChartContainer config={chartConfig} className="h-[190px] w-[190px]">
          <svg width="0" height="0" style={{ position: "absolute" }}>
            <defs>
              <linearGradient id="gradientFill" x1="0" y1="0.5" x2="1" y2="0.5">
                <stop offset="0%" stopColor="hsl(220, 70%, 50%)" />
                <stop offset="100%" stopColor="hsl(340, 70%, 53%)" />
              </linearGradient>
            </defs>
          </svg>
          <RadialBarChart
            data={[roomData]}
            endAngle={180}
            innerRadius={80}
            outerRadius={120}
          >
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) - 16}
                          className="fill-slate-300 text-2xl font-bold "
                        >
                          {roomData.temperature} °C
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 4}
                          className="fill-slate-300"
                        ></tspan>
                      </text>
                    );
                  }
                }}
              />
            </PolarRadiusAxis>
            <RadialBar
              dataKey="leftover"
              stackId="a"
              cornerRadius={5}
              fill="#1B1B1B"
              className=" stroke-transparent stroke-2"
            />
            <RadialBar
              dataKey="temperature"
              fill="url(#gradientFill)"
              stackId="a"
              cornerRadius={5}
              className="stroke-transparent stroke-2"
            />
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
