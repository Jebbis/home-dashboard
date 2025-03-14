import { useState, useEffect } from "react";
import BusStop from "./BusStop";

const BUS_STOPS = [
  { id: "HSL:4720210", name: "Sydäntie" },
  { id: "HSL:4730551", name: "Rekola" },
];

export default function BusComponent() {
  const [busData, setBusData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const responses = await Promise.all(
          BUS_STOPS.map(async (stop) => {
            const response = await fetch(
              `http://192.168.1.106:3000/bus/${stop.id}`
            );
            if (!response.ok)
              throw new Error(`Failed to fetch data for ${stop.name}`);
            const data = await response.json();
            return { id: stop.id, data };
          })
        );

        const newData = responses.reduce((acc, { id, data }) => {
          acc[id] = data;
          return acc;
        }, {});

        setBusData(newData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="flex flex-col gap-5 py-1.5">
      {BUS_STOPS.map((stop) => (
        <BusStop
          key={stop.id}
          stopData={busData[stop.id]}
          loading={loading}
          error={error}
        />
      ))}
    </div>
  );
}
