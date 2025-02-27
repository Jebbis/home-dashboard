import { useQuery } from "@apollo/client";
import client from "./apollo-client";
import { GET_BUS_ARRIVALS } from "./graphql/queries";
import BusStop from "./components/BusStop";
import LightControl from "./components/LightControl";
import SpotPrice from "./components/SpotPrice";
import TemperatureCard from "./components/TemperatureCard";
import Weather from "./components/Weather";

export default function Dashboard() {
  const {
    data: data_sydantie,
    loading: loading_sydantie,
    error: error_sydantie,
  } = useQuery(GET_BUS_ARRIVALS, {
    variables: { stopId: "HSL:4720210" }, // Stop ID 1
    client,
  });

  const {
    data: data_rekola,
    loading: loading_rekola,
    error: error_rekola,
  } = useQuery(GET_BUS_ARRIVALS, {
    variables: { stopId: "HSL:4730551" }, // Stop ID 2
    client,
  });

  return (
    <div className="flex flex-row gap-5 justify-evenly">
      <div className="flex flex-col gap-5 py-1.5">
        <h1 className="text-5xl text-dark font-bold">HSL Aikataulut</h1>
        <BusStop
          stopData={data_sydantie}
          loading={loading_sydantie}
          error={error_sydantie}
        />
        <BusStop
          stopData={data_rekola}
          loading={loading_rekola}
          error={error_rekola}
        />
      </div>
      <div className="flex flex-col gap-5 justify-evenly">
        <h1 className="text-5xl text-dark font-bold">Valot</h1>
        <div className="flex gap-5">
          <LightControl lightId="2" roomName="Olohuone" />
          <LightControl lightId="3" roomName="Makuuhuone" />
        </div>
        <h1 className="text-5xl text-dark font-bold mt-4">Pörssisähkö</h1>
        <SpotPrice />
      </div>
      <div className="flex flex-col gap-5 justify-evenly">
        <h1 className="text-5xl text-dark font-bold">Lämpötila</h1>
        <TemperatureCard roomName="Olohuone" temperature="20.5" />
        <TemperatureCard roomName="Makuuhuone" temperature="22.0" />
        <TemperatureCard roomName="Keittiö" temperature="21.7" />
      </div>
      <div className="flex flex-col gap-5 py-1.5">
        <h1 className="text-5xl text-dark font-bold">Sää</h1>
        <Weather />
      </div>
    </div>
  );
}
