import express from "express";
import {
  createStation,
  getStations,
  getStationById,
  updateStation,
  deleteStation,
} from "../controllers/chargingStationController.js";
import { auth } from "../middleware/auth.js";

const stationRouter = express.Router();

// Public Routes
stationRouter.route("/").get(getStations);
stationRouter.route("/:id").get(getStationById);

// Protected Routes
stationRouter.route("/").post(auth, createStation);
stationRouter.route("/:id")
  .put(auth, updateStation)
  .delete(auth, deleteStation);

export { stationRouter };
