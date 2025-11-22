import express from "express";
import { getLocations, createLocation } from "../controller/locationController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/")
    .get(authMiddleware, getLocations)
    .post(authMiddleware, createLocation);

export default router;