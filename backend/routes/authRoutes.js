import express from 'express';
import {registerUser, loginUser, logoutUser, promoteToAdmin} from '../controller/authController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.put("/promote/:userId", authMiddleware, promoteToAdmin);

export default router;