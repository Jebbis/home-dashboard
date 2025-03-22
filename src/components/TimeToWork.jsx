import React from "react";
import { Card } from "@/components/ui/card";
import TimeToWorkCar from "@/components/TimeToWorkCar";
import TimeToDestinationHSL from "@/components/TimeToDestinationHSL";

const TimeToWork = () => {
  return (
    <div className="flex flex-col gap-5 ">
      <Card className="flex flex-col gap-4 rounded-xl p-4 bg-[#1B1B1B] border-none text-dark">
        <h1 className="text-lg font-semibold text-dark">Lasse</h1>
        <TimeToWorkCar id="1" name="Lasse" />
        <TimeToDestinationHSL id="1" name="Lasse" />
      </Card>
      <Card className="flex flex-col gap-4 rounded-xl p-4 bg-[#1B1B1B] border-none text-dark">
        <h1 className="text-lg font-semibold text-dark">Roosa</h1>
        <TimeToWorkCar id="2" name="Roosa" />
        <TimeToDestinationHSL id="2" name="Roosa" />
      </Card>
    </div>
  );
};

export default TimeToWork;
