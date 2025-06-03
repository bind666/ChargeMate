import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar"; // adjust path if needed

const DashboardLayout = () => {
  return (
    <div>
      <Navbar />
      <main className="p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
