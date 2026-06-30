import express from "express";
import protect from "../middleware/authMiddleware.js";
import authorizeRoles from "../middleware/roleMiddleware.js";
import {
  createMessReview,
  getMessReviews,
  completeMessReview,
} from "../controllers/messReviewController.js";

const router = express.Router();

router.post("/", protect, authorizeRoles("student"), createMessReview);
router.get("/", protect, authorizeRoles("student", "rector", "admin"), getMessReviews);
router.put("/:id/complete", protect, authorizeRoles("student"), completeMessReview);

export default router;
