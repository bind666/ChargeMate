import React, { useEffect, useState } from "react";
import axios from "../utils/axios";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const statusColors = {
    Active: "bg-green-100 text-green-800",
    Inactive: "bg-red-100 text-red-800",
};

const connectorOptions = ["Type1", "Type2", "CCS", "CHAdeMO"];

const StationList = () => {
    const [stations, setStations] = useState([]);
    const [filters, setFilters] = useState({
        status: "",
        connectorType: "",
        minPower: "",
        maxPower: "",
    });
    const navigate = useNavigate();

    const fetchStations = async () => {
        try {
            const query = new URLSearchParams();
            if (filters.status) query.append("status", filters.status);
            if (filters.connectorType) query.append("connectorType", filters.connectorType);
            if (filters.minPower) query.append("powerOutput[$gte]", filters.minPower);
            if (filters.maxPower) query.append("powerOutput[$lte]", filters.maxPower);

            const res = await axios.get(`/stations?${query.toString()}`);
            setStations(res.data.data);
        } catch (err) {
            console.error(err);
        }
    };

    const deleteStation = async (id) => {
        if (!window.confirm("Are you sure you want to delete this station?")) return;
        try {
            await axios.delete(`/stations/${id}`);
            fetchStations();
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchStations();
    }, [filters]);

    return (
        <div className="p-4 max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-700">Charging Stations</h2>
                <Link
                    to="/stations/add"
                    className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                    + Add Station
                </Link>
            </div>

            {/* Filters */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <select
                    className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    value={filters.status}
                    onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                >
                    <option value="">All Status</option>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                </select>

                <select
                    className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    value={filters.connectorType}
                    onChange={(e) => setFilters({ ...filters, connectorType: e.target.value })}
                >
                    <option value="">All Connectors</option>
                    {connectorOptions.map((type) => (
                        <option key={type} value={type}>
                            {type}
                        </option>
                    ))}
                </select>

                <input
                    type="number"
                    placeholder="Min Power (kW)"
                    className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    value={filters.minPower}
                    onChange={(e) => setFilters({ ...filters, minPower: e.target.value })}
                />

                <input
                    type="number"
                    placeholder="Max Power (kW)"
                    className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    value={filters.maxPower}
                    onChange={(e) => setFilters({ ...filters, maxPower: e.target.value })}
                />
            </div>

            {/* Station Table */}
            <div className="overflow-x-auto rounded-lg shadow-md border border-gray-200">
                <table className="w-full table-auto border-collapse">
                    <thead className="bg-gray-100">
                        <tr>
                            {["Name", "Location", "Status", "Power (kW)", "Connector", "Actions"].map((heading) => (
                                <th
                                    key={heading}
                                    className="px-5 py-3 text-left text-gray-600 font-medium tracking-wider"
                                >
                                    {heading}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        <AnimatePresence>
                            {stations.length > 0 ? (
                                stations.map((station) => (
                                    <motion.tr
                                        key={station._id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ duration: 0.3 }}
                                        className="border-t border-gray-200 hover:bg-gray-50 cursor-pointer"
                                    >
                                        <td className="px-5 py-4 whitespace-nowrap">{station.name}</td>
                                        <td className="px-5 py-4 whitespace-nowrap">
                                            ({station.location?.latitude.toFixed(4)}, {station.location?.longitude.toFixed(4)})
                                        </td>
                                        <td className="px-5 py-4 whitespace-nowrap">
                                            <span
                                                className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${statusColors[station.status] || "bg-gray-100 text-gray-600"
                                                    }`}
                                            >
                                                {station.status}
                                            </span>
                                        </td>
                                        <td className="px-5 py-4 whitespace-nowrap">{station.powerOutput} kW</td>
                                        <td className="px-5 py-4 whitespace-nowrap">{station.connectorType}</td>
                                        <td className="px-5 py-4 whitespace-nowrap space-x-2">
                                            <button
                                                onClick={() => navigate(`/stations/edit/${station._id}`)}
                                                className="bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-1 rounded transition"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => deleteStation(station._id)}
                                                className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded transition"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </motion.tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="text-center py-6 text-gray-500">
                                        No stations found.
                                    </td>
                                </tr>
                            )}
                        </AnimatePresence>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default StationList;
