import express from "express";
import protect from "../middleware/authMiddleware.js";
import authorizeRoles from "../middleware/roleMiddleware.js";
import {
  createComplaint,
  getComplaints,
  updateComplaintStatus,
} from "../controllers/complaintController.js";

const router = express.Router();

router.post("/", protect, authorizeRoles("student"), createComplaint);
router.get("/", protect, authorizeRoles("student", "rector", "admin"), getComplaints);
router.put(
  "/:id/status",
  protect,
  authorizeRoles("rector", "admin"),
  updateComplaintStatus
);

export default router;
