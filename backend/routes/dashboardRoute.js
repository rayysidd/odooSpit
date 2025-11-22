import express from "express";
import { getDashboardKPIs } from "../controller/dashboardController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/kpis", authMiddleware, getDashboardKPIs);

export default router;