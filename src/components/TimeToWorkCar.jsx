import React, { useState, useEffect } from "react";
import { Car } from "lucide-react";
import { Card } from "@/components/ui/card";

const TimeToWorkCar = ({ id, name }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://192.168.100.3:3000/timetowork/${id}`
        );
        if (!response.ok) {
          throw new Error(`Failed to fetch data for ${name}`);
        }
        const result = await response.json();
        const resultData = { ...result, id, name };
        console.log(resultData);

        setData(resultData);
      } catch (err) {
        console.log(err.message);
      }
    };

    fetchData();
  }, [id, name]);

  // Get current time
  const currentTime = new Date();
  const formattedCurrentTime = currentTime.toLocaleTimeString("fi-FI", {
    hour: "2-digit",
    minute: "2-digit",
  });

  // Calculate arrival time
  const arrivalTime = new Date(
    currentTime.getTime() + (data?.totalTime || 0) * 1000
  );
  const formattedArrivalTime = arrivalTime.toLocaleTimeString("fi-FI", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div>
      {
        <Card
          key={data.id}
          className="text-dark rounded-xl py-2 px-4 bg-[#083740]"
        >
          <div className="flex flex-row justify-between items-center">
            <div className="font-bold text-dark text-lg">
              {formattedCurrentTime}
            </div>
            <div className="flex flex-col w-full px-4">
              <div className="text-center text-sm">
                {data.totalTime
                  ? `${(data.totalTime / 60).toFixed(0)} min`
                  : "No data"}
              </div>
              <div className="flex items-center">
                <div className="flex-1 h-1.5 rounded-xl bg-[#e1e1e1]"></div>
                <Car />
                <div className="flex-1 h-1.5 rounded-xl bg-[#e1e1e1]"></div>
              </div>
              <div className="text-center text-sm">Autolla</div>
            </div>
            <div className="font-bold text-dark text-lg">
              {formattedArrivalTime}
            </div>
          </div>
        </Card>
      }
    </div>
  );
};

export default TimeToWorkCar;
