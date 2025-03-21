import React from "react";
import BusComponent from "../components/BusComponentThree";
import TimeToWork from "@/components/TimeToWork";

const Map = () => {
  return (
    <div className="flex flex-row gap-5 ">
      <div className="flex flex-col gap-5">
        <h1 className="text-5xl text-dark font-bold">HSL Aikataulut</h1>
        <BusComponent />
      </div>
      <div>
        <TimeToWork />
      </div>
    </div>
  );
};

export default Map;
