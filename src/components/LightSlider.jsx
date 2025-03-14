import { useState, useRef } from "react";
import { Slider } from "@/components/ui/slider";

export default function LightSlider({ lightId }) {
  const [brightness, setBrightness] = useState(150);
  const [loading, setLoading] = useState(false);
  const debounceTimeout = useRef(null);

  // Function to send brightness update to the API
  const updateLightBrightness = async (value) => {
    setBrightness(value); // Update state
    setLoading(true); // Indicate loading state

    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current); // Clear previous timeout
    }

    // Set a new timeout for the API call
    debounceTimeout.current = setTimeout(async () => {
      try {
        const response = await fetch(
          `http://192.168.1.106:3000/hue/lights/${lightId}/brightness/${value}`,
          {
            method: "PUT",
          }
        );

        if (!response.ok) {
          console.error("Failed to update light brightness");
        }
      } catch (error) {
        console.error("Error sending request:", error);
      } finally {
        setLoading(false); // Reset loading state
      }
    }, 100);
  };

  return (
    <div className="flex flex-col items-center gap-3 pt-10 text-dark">
      <Slider
        defaultValue={[150]}
        max={254}
        step={1}
        value={[brightness]}
        onValueChange={(value) => updateLightBrightness(value[0])}
        className="w-full"
      />
    </div>
  );
}
