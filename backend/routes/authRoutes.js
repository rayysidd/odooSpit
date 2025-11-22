import express from 'express';
import { 
    registerUser, 
    loginUser, 
    logoutUser, 
    promoteToAdmin,
    forgotPassword, // Import this
    resetPassword   // Import this
} from '../controller/authController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.put("/promote/:userId", authMiddleware, promoteToAdmin);

// New OTP Routes
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

export default router;