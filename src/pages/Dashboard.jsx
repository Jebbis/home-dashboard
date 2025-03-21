import BusComponent from "../components/BusComponent";
import LightControl from "../components/LightControl";
import SpotPrice from "../components/SpotPrice";
import TemperatureCard from "../components/TemperatureCard";
import Weather from "../components/Weather";

export default function Dashboard() {
  return (
    <div className="flex flex-row gap-5 ">
      {/* 1. column */}
      <div className="flex flex-col gap-5">
        <h1 className="text-5xl text-dark font-bold">HSL Aikataulut</h1>
        <BusComponent />
      </div>
      {/* 2. column */}
      <div className="flex flex-col gap-5">
        <h1 className="text-5xl text-dark font-bold">Valot</h1>
        <div className="flex gap-5 ">
          <LightControl lightId="2" roomName="Olohuone" />
          <LightControl lightId="3" roomName="Makuuhuone" />
        </div>
        <h1 className="text-5xl text-dark font-bold mt-4 h-full content-end">
          Pörssisähkö
        </h1>
        <SpotPrice />
      </div>
      {/* 3. column */}
      <div className="flex flex-col gap-4 ">
        <h1 className="text-5xl text-dark font-bold">Lämpö</h1>
        <div className="flex flex-col gap-5">
          <TemperatureCard roomName="Olohuone" temperature="20.5" />
          <TemperatureCard roomName="Makuuhuone" temperature="22.0" />
          <TemperatureCard roomName="Keittiö" temperature="21.7" />
        </div>
      </div>
      {/* 4. column */}
      <div className="flex flex-col gap-5">
        <h1 className="text-5xl text-dark font-bold">Sää</h1>
        <Weather />
      </div>
    </div>
  );
}
