import { useQuery } from "@apollo/client";
import client from "./apollo-client";
import { GET_BUS_ARRIVALS } from "./graphql/queries";
import BusStop from "./components/BusStop";
import LightControl from "./components/LightControl";

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
    <div className="flex flex-col gap-5">
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
      <div className="flex gap-5">
        <LightControl lightId="2" roomName="Olohuone" />
        <LightControl lightId="3" roomName="Makuuhuone" />
      </div>
    </div>
  );
}
