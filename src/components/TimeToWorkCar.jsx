import React, { useState, useEffect } from "react";

const TimeToWorkCar = () => {
  const [data, setData] = useState([]);

  // List of items with ids and names
  const locations = [
    { id: "1", name: "Lassen työ" },
    { id: "2", name: "Roosan työ" },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responses = await Promise.all(
          locations.map(async (location) => {
            const response = await fetch(
              `http://192.168.1.106:3000/timetowork/${location.id}`
            );
            if (!response.ok) {
              throw new Error(`Failed to fetch data for ${location.name}`);
            }
            const result = await response.json();
            return { ...location, timeToWork: result.totalTime };
          })
        );
        setData(responses);
      } catch (err) {
        console.log(err.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1 className="text-lg font-semibold text-dark py-4">Autolla</h1>
      <ul>
        {data.map((location) => (
          <li key={location.id} className="text-dark">
            <strong>{location.name}</strong>:{" "}
            {location.timeToWork
              ? `${(location.timeToWork / 60).toFixed(0)} min`
              : "No data"}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TimeToWorkCar;
