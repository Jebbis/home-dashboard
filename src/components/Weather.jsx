"use client";

import { CloudSun } from "lucide-react";
import { useEffect, useState } from "react";
import {
  Line,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  ReferenceLine,
} from "recharts";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export default function Weather() {
  const [chartData, setChartData] = useState([]);
  const [forecastData, setForecastData] = useState([]);

  useEffect(() => {
    async function fetchWeather() {
      try {
        const response = await fetch("http://192.168.1.106:3000/weather/today");
        const data = await response.json();
        console.log(data);

        if (data.temp_data_points) {
          const formattedData = data.temp_data_points.map((point) => ({
            time: point.time, // "06", "12", etc.
            temp: point.temp, // Temperature value
          }));

          setForecastData(data.nextDaysForecast);
          setChartData(formattedData);
          console.log(formattedData);
        }
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    }

    fetchWeather();
  }, []);

  const chartConfig = {
    temp: {
      label: "Temperature",
      color: "hsl(220, 90%, 56%)",
    },
  };

  return (
    <Card className="flex flex-col h-full w-[600px] rounded-xl bg-[#1B1B1B] border-none text-dark">
      <CardHeader className="pt-6 pb-2">
        <CardTitle className="ml-2 font-bold">Lämpötila nyt</CardTitle>
        <CardTitle className="ml-2 font-bold">
          -12
          <span className="text-muted-foreground text-2xl">&nbsp; °C</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            data={chartData}
            margin={{ left: 12, right: 12, top: 20, bottom: 20 }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="time"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />

            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Line
              dataKey="temp"
              type="natural"
              strokeWidth={3}
              dot={false}
              stroke="hsl(340, 70%, 53%)"
            />
            <YAxis
              type="number"
              interval={0}
              domain={["dataMin -2", "dataMax + 5"]}
              tickLine={false}
              axisLine={false}
              allowDataOverflow={true}
              width={20}
            />
            <ReferenceLine x="15" stroke="gray" strokeDasharray="3 3" />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <div className="px-8 flex flex-col gap-3">
        <h1 className="text-dark font-semibold text-xl">
          Kolmen päivän ennuste
        </h1>
        {forecastData.slice(1).map((forecast, index) => (
          <div key={index} className="flex flex-row gap-3">
            <div className="min-w-8">
              {forecast.date.charAt(0).toUpperCase() + forecast.date.slice(1)}
            </div>
            <CloudSun />
            <div className="min-w-12 text-end">
              {forecast.temp_min}{" "}
              <span className="text-muted-foreground text-base">&nbsp;°C</span>
            </div>
            <div
              className="rounded-xl w-[500px]"
              style={{
                background: `linear-gradient(to right, 
      hsl(${forecast.temp_min * 2 + 200}, 70%, 53%), 
      hsl(${forecast.temp_max * 2 + 200}, 70%, 53%))`,
              }}
            ></div>
            <div className="min-w-12 ">
              {forecast.temp_max}{" "}
              <span className="text-muted-foreground text-base">&nbsp;°C</span>
            </div>
          </div>
        ))}
      </div>
      <CardFooter className="text-muted-foreground text-sm mt-6">
        Päivitetty 22:51
      </CardFooter>
    </Card>
  );
}
