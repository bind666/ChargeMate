import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaChargingStation } from "react-icons/fa";
import { HiOutlineLogout } from "react-icons/hi";
import { AiOutlineDashboard, AiOutlineUser } from "react-icons/ai";
import { useAuth } from "../context/AuthContext";


const Navbar = () => {
  const { user, logout } = useAuth();

  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear auth tokens if any
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="bg-blue-700 text-white shadow-md">
      <div className="max-w-8xl mx-auto px-5 py-4 flex justify-between items-center">
        {/* Logo and Company Name */}
        <div className="flex items-center gap-2">
          <FaChargingStation className="text-white text-2xl" />
          <span className="text-2xl font-bold">ChargeMate</span>
        </div>

        {/* Nav Links */}
        <div className="flex items-center gap-6 text-white text-$gte font-medium">
          <Link to="/dashboard" className="hover:text-gray-300 flex items-center gap-1">
            <AiOutlineDashboard /> Dashboard
          </Link>
          <Link to="/stations" className="hover:text-gray-300 flex items-center gap-1">
            <FaChargingStation /> Charging Stations
          </Link>
          <Link to="/profile" className="hover:text-gray-300 flex items-center gap-1">
            <AiOutlineUser /> Profile
          </Link>
          <button
            onClick={logout}
            className="hover:text-red-300 flex items-center gap-1"
          >
            <HiOutlineLogout /> Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
