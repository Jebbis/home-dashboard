import { useState } from "react";
import { Slider } from "@/components/ui/slider";

const bridgeId = import.meta.env.VITE_HUE_BRIDGE_ID;
const bridgeIp = import.meta.env.VITE_HUE_BRIDGE_IP;

export default function LightSlider({ lightId }) {
  const [brightness, setBrightness] = useState(150); // Default brightness
  const [loading, setLoading] = useState(false);

  // Function to send brightness update to the API
  const updateLightBrightness = async (value) => {
    setBrightness(value); // Update state
    setLoading(true); // Indicate loading state

    console.log(import.meta.env.VITE_HUE_BRIDGE_ID);

    try {
      const response = await fetch(
        `https://${bridgeIp}/api/${bridgeId}/lights/${lightId}/state`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            on: true,
            bri: value,
          }),
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
  };

  return (
    <div className="flex flex-col items-center gap-3 pt-10 text-dark">
      <Slider
        defaultValue={[150]} // Default brightness
        max={254} // Philips Hue max brightness
        step={1}
        value={[brightness]} // Controlled component
        onValueChange={(value) => updateLightBrightness(value[0])} // API call on change
        className="w-full"
      />
    </div>
  );
}
