import express from "express";
import {
    createOperation,
    getOperations,
    getOperationById,
    validateOperation
} from "../controller/stockController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// Operations
router.post("/operations", authMiddleware, createOperation);
router.get("/operations", authMiddleware, getOperations);
router.get("/operations/:id", authMiddleware, getOperationById);
router.put("/operations/:id/validate", authMiddleware, validateOperation);

export default router;