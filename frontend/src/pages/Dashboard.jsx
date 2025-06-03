import React from "react";
import MapView from "../components/MapView";

function Dashboard() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-gray-700">Charging Station Map</h1>
      <MapView />
    </div>
  );
}

export default Dashboard;
