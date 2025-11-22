import express from 'express';
import { getUserProfile, updateUserProfile } from '../controller/userController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

// All routes here are protected
router.use(authMiddleware);

router.get('/me', getUserProfile);
router.put('/me', updateUserProfile);

export default router;