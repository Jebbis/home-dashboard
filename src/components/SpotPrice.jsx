"use client";

import { useEffect, useState } from "react";
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
  tomorrow: {
    label: "Huomenna",
    color: "hsl(340, 70%, 53%)",
  },
  today: {
    label: "Tänään",
    color: "hsl(220, 70%, 50%)",
  },
};

export default function SpotPrice() {
  const [chartData, setChartData] = useState([]);
  const [higherDay, sethigherDay] = useState();
  const [currentHour, setCurrentHour] = useState(new Date());
  const [currentPrice, setCurrentPrice] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("http://192.168.1.106:3000/external-data");
        const data = await response.json();
        if (data && Array.isArray(data)) {
          const formattedData = data.map(({ time, tomorrow, today }) => ({
            time,
            tomorrow,
            today,
          }));
          setChartData(formattedData);
          sethigherDay(data[0].higherDay);

          console.log(formattedData);

          // Find current hour's price
          const currentHourStr = new Date()
            .getHours()
            .toString()
            .padStart(2, "0");
          const currentEntry = formattedData.find(
            (entry) => entry.time === currentHourStr
          );
          if (currentEntry) {
            setCurrentPrice(currentEntry.today);
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
    setCurrentHour(new Date());

    // Update time every minute
    const minuteInterval = setInterval(() => {
      setCurrentHour(new Date());
    }, 60000);

    // Fetch new prices every hour
    const hourInterval = setInterval(() => {
      fetchData();
    }, 3600000); // 1 hour

    return () => {
      clearInterval(minuteInterval);
      clearInterval(hourInterval);
    };
  }, []);

  return (
    <Card className="bg-[#1B1B1B] border-none text-dark rounded-xl pb-4">
      <CardHeader>
        <CardDescription className="font-extrabold">Hinta nyt</CardDescription>

        <div className="flex flex-row justify-between">
          <CardTitle>
            {currentPrice !== null
              ? `${currentPrice.toFixed(1)} c/kWh`
              : "Ladataan..."}
          </CardTitle>
          <CardDescription className="font-extrabold">
            {`Saunan lämmitys: ${((currentPrice * 9) / 100).toFixed(2)}€`}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart accessibilityLayer data={chartData}>
            <ReferenceLine
              x={currentHour.getHours().toString()}
              stroke="gray"
              strokeDasharray="3 3"
            />
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="time"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <YAxis
              dataKey={higherDay}
              width={30}
              allowDecimals={false}
              tickLine={false}
              axisLine={false}
              allowDataOverflow={false}
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
              dataKey="tomorrow"
              type="natural"
              stroke="var(--color-tomorrow)"
              strokeWidth={2}
              dot={false}
            />
            <ChartLegend content={<ChartLegendContent />} height={5} />
          </LineChart>
        </ChartContainer>
      </CardContent>
      {/*       <CardFooter className="text-muted-foreground text-sm">
        Päivitetty{" "}
        {currentHour.toLocaleTimeString("fi-FI", {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </CardFooter> */}
    </Card>
  );
}
