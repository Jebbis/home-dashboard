import { useState, useEffect } from "react";
import { Power, PowerOff } from "lucide-react";

export default function LightToggleButton({ lightId }) {
  const [isOn, setIsOn] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLightState = async () => {
      try {
        const response = await fetch(
          `http://192.168.1.106:3000/hue/lights/${lightId}`
        );
        if (!response.ok) throw new Error("Failed to fetch light state");

        const data = await response.json();
        setIsOn(data.isOn);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchLightState();
  }, [lightId]);

  const toggleLight = async () => {
    if (isOn === null) return;
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `http://192.168.1.106:3000/hue/lights/${lightId}/state`,
        {
          method: "PUT",
        }
      );

      if (!response.ok) throw new Error("Failed to update light state");

      const data = await response.json();
      setIsOn(data.isOn);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <button
        onClick={toggleLight}
        disabled={loading || isOn === null}
        className={`flex items-center justify-center w-12 h-12 rounded-full font-semibold ${
          isOn
            ? "bg-[#363636] hover:bg-[#525252]"
            : "bg-[#bbbdbd] hover:bg-[#747575]"
        } disabled:bg-gray-400 text-white`}
      >
        {loading ? (
          "..."
        ) : isOn ? (
          <PowerOff color={"#020202"} />
        ) : (
          <Power color={"#020202"} />
        )}
      </button>
      {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
    </div>
  );
}
