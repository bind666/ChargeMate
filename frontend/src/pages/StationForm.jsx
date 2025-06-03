import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../utils/axios";
import { motion } from "framer-motion";

const connectorOptions = ["Type1", "Type2", "CCS", "CHAdeMO"];

const StationForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        setValue,
        reset,
        formState: { errors },
    } = useForm({
        defaultValues: {
            status: "Active", // Default value for status
        },
    });

    useEffect(() => {
        if (id) {
            axios.get(`/stations/${id}`).then((res) => {
                const station = res.data.data;
                setValue("name", station.name);
                setValue("latitude", station.location.latitude);
                setValue("longitude", station.location.longitude);
                setValue("status", station.status || "Active");
                setValue("powerOutput", station.powerOutput);
                setValue("connectorType", station.connectorType);
            });
        } else {
            reset({
                status: "Active", // Reset with Active as default for new form
            });
        }
    }, [id, setValue, reset]);

    const onSubmit = async (data) => {
        try {
            const stationData = {
                name: data.name,
                location: {
                    latitude: parseFloat(data.latitude),
                    longitude: parseFloat(data.longitude),
                },
                status: data.status,
                powerOutput: parseFloat(data.powerOutput),
                connectorType: data.connectorType,
            };

            if (id) {
                await axios.put(`/stations/${id}`, stationData);
                alert("Station updated successfully");
            } else {
                await axios.post("/stations", stationData);
                alert("Station created successfully");
            }

            navigate("/stations");
        } catch (err) {
            console.error("Error saving station:", err);
        }
    };

    return (
        <motion.div
            className="max-w-xl mx-auto mt-3 p-6 bg-white rounded-2xl shadow-xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
        >
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">
                {id ? "Edit" : "Add"} Charging Station
            </h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                {/* Name */}
                <div>
                    <input
                        {...register("name", { required: "Name is required" })}
                        placeholder="Station Name"
                        className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    />
                    {errors.name && (
                        <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                    )}
                </div>

                {/* Latitude */}
                <div>
                    <input
                        {...register("latitude", { required: "Latitude is required" })}
                        placeholder="Latitude"
                        type="number"
                        step="any"
                        className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    />
                    {errors.latitude && (
                        <p className="text-red-500 text-sm mt-1">{errors.latitude.message}</p>
                    )}
                </div>

                {/* Longitude */}
                <div>
                    <input
                        {...register("longitude", { required: "Longitude is required" })}
                        placeholder="Longitude"
                        type="number"
                        step="any"
                        className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    />
                    {errors.longitude && (
                        <p className="text-red-500 text-sm mt-1">{errors.longitude.message}</p>
                    )}
                </div>

                {/* Status */}
                <div>
                    <select
                        {...register("status")}
                        className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    >
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                    </select>
                </div>

                {/* Power Output */}
                <div>
                    <input
                        {...register("powerOutput", { required: "Power Output is required" })}
                        placeholder="Power Output (kW)"
                        type="number"
                        step="any"
                        className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    />
                    {errors.powerOutput && (
                        <p className="text-red-500 text-sm mt-1">{errors.powerOutput.message}</p>
                    )}
                </div>

                {/* Connector Type */}
                <div>
                    <select
                        {...register("connectorType", { required: "Connector Type is required" })}
                        className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                        defaultValue=""
                    >
                        <option value="" disabled>
                            Select Connector Type
                        </option>
                        {connectorOptions.map((type) => (
                            <option key={type} value={type}>
                                {type}
                            </option>
                        ))}
                    </select>
                    {errors.connectorType && (
                        <p className="text-red-500 text-sm mt-1">{errors.connectorType.message}</p>
                    )}
                </div>

                {/* Submit */}
                <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 transition text-white font-semibold py-3 rounded-lg"
                >
                    {id ? "Update" : "Create"} Station
                </motion.button>
            </form>
        </motion.div>
    );
};

export default StationForm;
