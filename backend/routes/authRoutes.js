import express from "express";
import {
  loginUser,
  forgotPassword,
  resetPassword,
  checkEmail,
  getProfile,
  changePassword
} from "../controllers/authController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/check-email", checkEmail);
router.post("/login", loginUser);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

// Protected routes
router.get("/profile", verifyToken, getProfile);
router.post("/change-password", verifyToken, changePassword);

export default router;
