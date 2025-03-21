import { Link, useLocation } from "react-router-dom";
import { House, Zap, Lightbulb, Map, Settings } from "lucide-react";

export default function Navbar() {
  const location = useLocation(); // Get current route

  // Function to check if a link is active
  const isActive = (path) => location.pathname === path;

  return (
    <div className="flex flex-row w-[1550px] p-4 justify-around items-center relative">
      <Link to="/" className="relative flex flex-col items-center">
        <House size={42} className="text-dark" />
        {isActive("/") && (
          <div className="absolute bottom-[-8px] w-16 h-1 bg-red-500"></div>
        )}
      </Link>
      <Link to="/lights" className="relative flex flex-col items-center">
        <Lightbulb size={42} className="text-dark" />
        {isActive("/lights") && (
          <div className="absolute bottom-[-8px] w-16 h-1 bg-red-500"></div>
        )}
      </Link>
      <Link to="/map" className="relative flex flex-col items-center">
        <Map size={42} className="text-dark" />
        {isActive("/map") && (
          <div className="absolute bottom-[-8px] w-16 h-1 bg-red-500"></div>
        )}
      </Link>
      <Link to="/energy" className="relative flex flex-col items-center">
        <Zap size={42} className="text-dark" />
        {isActive("/energy") && (
          <div className="absolute bottom-[-8px] w-16 h-1 bg-red-500"></div>
        )}
      </Link>
      <Link to="/settings" className="relative flex flex-col items-center">
        <Settings size={42} className="text-dark" />
        {isActive("/settings") && (
          <div className="absolute bottom-[-8px] w-16 h-1 bg-red-500"></div>
        )}
      </Link>
    </div>
  );
}
