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
  const [currentHour, setCurrentHour] = useState(() =>
    getClosestThreeHourMark()
  );
  const [currentTemp, setCurrentTemp] = useState(null);

  function getClosestThreeHourMark() {
    const currentHour = new Date().getHours();
    return Math.round(currentHour / 3) * 3; // Round to the nearest 3-hour mark
  }

  useEffect(() => {
    async function fetchWeather() {
      try {
        const response = await fetch("http://192.168.1.106:3000/weather/today");
        const data = await response.json();

        if (data.temp_data_points) {
          const formattedData = data.temp_data_points.map(({ time, temp }) => ({
            time,
            temp,
          }));

          setForecastData(data.nextDaysForecast);
          setChartData(formattedData);

          console.log(formattedData);

          const currentEntry = formattedData.find(
            (entry) => Number(entry.time) === currentHour
          );
          if (currentEntry) {
            setCurrentTemp(currentEntry.temp);
          }
        }
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    }

    fetchWeather();
  }, []);

  useEffect(() => {
    const updateHour = () => setCurrentHour(getClosestThreeHourMark());
    console.log("weather time:", currentHour);
    const interval = setInterval(updateHour, 60000);
    return () => clearInterval(interval);
  }, []); // Only update the time every minute

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
          {currentTemp}
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
              domain={([dataMin, dataMax]) => {
                let roundedMin = Math.floor((dataMin - 2) / 2) * 2; // Round down to nearest even
                let roundedMax = Math.ceil((dataMax + 2) / 2) * 2; // Round up to nearest even

                let gap = roundedMax - roundedMin;

                // Ensure the gap is divisible by 4
                if (gap % 4 !== 0) {
                  roundedMax += 4 - (gap % 4); // Increase max to make gap a multiple of 4
                }

                if (!isFinite(roundedMax)) {
                  roundedMax = 1;
                }
                if (!isFinite(roundedMin)) {
                  roundedMin = 0;
                }

                return [roundedMin, roundedMax];
              }}
              tickLine={false}
              axisLine={false}
              allowDataOverflow={false}
              width={20}
              tickCount={5}
            />
            <ReferenceLine
              x={currentHour.toString()}
              stroke="gray"
              strokeDasharray="3 3"
            />
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
      <CardFooter className="text-muted-foreground text-sm">
        Päivitetty{" "}
        {new Date().setHours(Number(currentHour), 0) &&
          new Date().toLocaleTimeString("fi-FI", {
            hour: "2-digit",
            minute: "2-digit",
          })}
      </CardFooter>
    </Card>
  );
}
