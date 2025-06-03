import ChargingStation from "../models/chargingStation.js";
import ApiResponse from "../utils/ApiResponse.js";
import createError from "http-errors";
import asyncHandler from "express-async-handler";

// Create
export const createStation = asyncHandler(async (req, res, next) => {
    const station = await ChargingStation.create(req.body);
    res
        .status(201)
        .json(new ApiResponse(station, "Charging station created successfully"));
});

// Read All (with filters)
export const getStations = asyncHandler(async (req, res, next) => {
    const filters = req.query;
    const stations = await ChargingStation.find(filters);
    res
        .status(200)
        .json(new ApiResponse(stations, "Charging stations fetched successfully"));
});

// Read Single
export const getStationById = asyncHandler(async (req, res, next) => {
    const station = await ChargingStation.findById(req.params.id);
    if (!station) return next(createError(404, "Charging station not found"));
    res
        .status(200)
        .json(new ApiResponse(station, "Charging station fetched successfully"));
});

// Update
export const updateStation = asyncHandler(async (req, res, next) => {
    const updated = await ChargingStation.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    });
    if (!updated) return next(createError(404, "Charging station not found"));
    res
        .status(200)
        .json(new ApiResponse(updated, "Charging station updated successfully"));
});

// Delete
export const deleteStation = asyncHandler(async (req, res, next) => {
    const deleted = await ChargingStation.findByIdAndDelete(req.params.id);
    if (!deleted) return next(createError(404, "Charging station not found"));
    res
        .status(200)
        .json(new ApiResponse(null, "Charging station deleted successfully"));
});
