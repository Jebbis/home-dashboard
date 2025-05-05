import React from "react";
import BusComponentThree from "../components/BusComponentThree";
import TimeToWork from "@/components/TimeToWork";
import SketchCanvas from "@/components/SketchCanvas";

const Map = () => {
  return (
    <div className="flex flex-row gap-5 ">
      <div className="flex flex-col gap-5">
        <h1 className="text-5xl text-dark font-bold">HSL Aikataulut</h1>
        <BusComponentThree />
      </div>
      <div className="flex flex-col gap-5 w-[500px]">
        <h1 className="text-5xl text-dark font-bold">Time to work</h1>
        <TimeToWork />
      </div>
      <div className="flex flex-col gap-5 w-[500px]">
        <h1 className="text-5xl text-dark font-bold">Muistilappu</h1>
        <SketchCanvas />
      </div>
    </div>
  );
};

export default Map;
