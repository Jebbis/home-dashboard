import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Lights from "./pages/Lights";
import MapComponent from "./pages/Map";
import Energy from "./pages/Energy";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <Router>
      <div className="flex flex-col w-[1550px] gap-5 pt-5">
        <Navbar />
        <main className="flex flex-col p-5">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/lights" element={<Lights />} />
            <Route path="/map" element={<MapComponent />} />
            <Route path="/energy" element={<Energy />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
