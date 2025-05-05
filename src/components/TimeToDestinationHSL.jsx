import React, { useState, useEffect } from "react";
import { TrainFront, Footprints, Bus, TramFront } from "lucide-react";
import { Card } from "@/components/ui/card";

const TimeToDestinationHSL = ({ id, name }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://192.168.100.3:3000/timeToDestination/${id}`
        );
        if (!response.ok) {
          throw new Error(`Failed to fetch data for ${name}`);
        }
        const result = await response.json();
        const resultData = { ...result.planConnection, id, name };
        console.log(resultData);

        setData(resultData.edges?.map((item) => item) || []);
      } catch (err) {
        console.log(err.message);
      }
    };

    fetchData();
  }, [id, name]);

  const getFormattedTime = (timeString) => {
    const date = new Date(timeString);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const getColor = (mode) => {
    switch (mode) {
      case "WALK":
        return "#ccc";
      case "BUS":
        return "#ffd166";
      case "RAIL":
        return "#8c4799";
      default:
        return "#06d6a0";
    }
  };

  const getIcon = (mode) => {
    switch (mode) {
      case "WALK":
        return <Footprints size={16} />;
      case "BUS":
        return <Bus size={16} />;
      case "RAIL":
        return <TrainFront size={16} />;
      case "TRAM":
        return <TramFront size={16} />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {data.map((item, index) => (
        <Card
          key={index}
          className="text-dark rounded-xl py-4 px-4 bg-[#0074bf]"
        >
          <div className="flex flex-row justify-between items-center gap-1">
            {/* Current time */}
            <div className="font-bold text-[#e1e1e1] text-lg">
              <div className="text-xs">HSL</div>
              {getFormattedTime(item.node.start)}
            </div>

            <div className="flex flex-col w-full px-4">
              {/* Travel time */}

              {/* Progress Bar with Car */}
              <div className="flex items-center w-full">
                {item.node.legs.map((segment, index) => {
                  let percentage =
                    (segment.duration /
                      item.node.legs.reduce(
                        (sum, seg) => sum + seg.duration,
                        0
                      )) *
                    100;

                  // Ensure minimum %
                  percentage = Math.max(percentage, 15);

                  return (
                    <div
                      key={index}
                      className="flex items-center"
                      style={{ width: `${percentage}%` }}
                    >
                      <div
                        className="h-1.5 w-full rounded-xl"
                        style={{ backgroundColor: getColor(segment.mode) }}
                      ></div>
                      <div className="relative flex flex-col items-center">
                        <div className="absolute -top-5 left-1/2 -translate-x-1/2 text-xs whitespace-nowrap">
                          {(segment.duration / 60).toFixed(0)}
                        </div>
                        <div className="relative">
                          {getIcon(segment.mode)}
                          <div className="absolute top-full left-1/2 -translate-x-1/2 text-xs whitespace-nowrap font-bold drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.3)]">
                            {segment.mode === "WALK"
                              ? "" /* segment.mode.charAt(0) +
                                segment.mode.slice(1).toLowerCase() */
                              : segment.trip.routeShortName}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Arrival time */}
            <div className="font-bold">
              <div className="text-center text-xs">
                {item.node.legs.length > 0
                  ? `${(
                      item.node.legs.reduce(
                        (total, leg) => total + leg.duration,
                        0
                      ) / 60
                    ).toFixed(0)} min`
                  : "No data"}
              </div>
              <div className="text-[#e1e1e1] text-lg">
                {item.node.end
                  ? getFormattedTime(item.node.end)
                  : "No arrival time"}
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default TimeToDestinationHSL;
