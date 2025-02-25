import { Armchair, Bed } from "lucide-react";
import LightSlider from "./LightSlider";
import LightToggleButton from "./LightToggleButton"; // Import the button

export default function LightControl({ lightId, roomName }) {
  return (
    <div className="flex flex-col justify-between p-4 bg-[#1B1B1B] w-full min-h-[150px] rounded-xl shadow-md text-center text-dark">
      <div className="flex flex-row gap-5 justify-between">
        <div className="flex flex-col gap-2">
          {roomName === "Olohuone" ? (
            <Armchair size={40} strokeWidth={1.5} />
          ) : roomName === "Makuuhuone" ? (
            <Bed size={40} strokeWidth={1.5} />
          ) : null}
          <p>{roomName}</p>
        </div>
        <LightToggleButton lightId={lightId} />
      </div>
      <LightSlider lightId={lightId} />
    </div>
  );
}
