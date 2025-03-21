import { useLocation } from "react-router-dom";

export default function BusStop({ stopData, loading, error }) {
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching data</p>;
  if (!stopData) return <p>No data available.</p>;

  const location = useLocation();
  const sliceCount = location.pathname === "/" ? 5 : 3;

  console.log(stopData);

  return (
    <div className="p-4 bg-[#1B1B1B] rounded-xl shadow w-[500px]">
      <h3 className="text-lg font-semibold text-dark pb-2">
        {stopData.name === "Rekola"
          ? "Rekolan asema"
          : stopData.name === "Sairaalakatu"
          ? "Koivukylänväylä"
          : stopData.name}
      </h3>
      {stopData.stoptimesWithoutPatterns
        .slice(0, sliceCount)
        .map((bus, index) => {
          const now = new Date();
          const secondsSinceMidnight = Math.floor(
            (now.getTime() - new Date(now.setHours(0, 0, 0, 0)).getTime()) /
              1000
          ); // Seconds since midnight today
          const arrivalTime = bus.realtimeArrival; // Arrival time in seconds since midnight
          const minutesLeft = Math.max(
            0,
            Math.floor((arrivalTime - secondsSinceMidnight) / 60)
          ); // Calculate minutes left
          const isRekolaStop = stopData.name === "Rekola"; // Change this condition as needed

          return (
            <div key={index} className="flex items-center gap-5 p-2">
              <div
                className={`flex justify-center font-bold text-dark rounded-sm ${
                  isRekolaStop ? "bg-[#8C4799]" : "bg-[#0074bf]"
                } px-2 py-1 min-w-[60px]`}
              >
                <p>{bus.trip.routeShortName}</p>
              </div>
              <p className="text-dark min-w-[220px]">{bus.headsign}</p>
              <p
                className={`font-semibold w-16 ${
                  bus.realtime ? "text-green-400" : "text-dark"
                }`}
              >
                {minutesLeft} min
              </p>
              <p className="text-dark">
                {new Date((arrivalTime - 7200) * 1000).toLocaleTimeString(
                  "en-GB",
                  {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false,
                  }
                )}
              </p>
            </div>
          );
        })}
    </div>
  );
}
