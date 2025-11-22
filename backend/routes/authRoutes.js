import express from 'express';
import { 
    registerUser, 
    loginUser, 
    logoutUser, 
    promoteToAdmin,
    // UPDATED: Renamed from forgotPassword to requestOTP
    requestOTP, 
    // UPDATED: Renamed from resetPassword to verifyOTP
    verifyOTP   
} from '../controller/authController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.put("/promote/:userId", authMiddleware, promoteToAdmin);

// New OTP Routes
// UPDATED: Route uses the new controller function name
router.post("/forgot-password", requestOTP); 
// UPDATED: Route uses the new controller function name
router.post("/reset-password", verifyOTP);

export default router;