import express from "express";
import protect from "../middleware/authMiddleware.js";
import authorizeRoles from "../middleware/roleMiddleware.js";
import {
  createAnnouncement,
  getAnnouncements,
  deleteAnnouncement,
} from "../controllers/announcementController.js";

const router = express.Router();

router.post("/", protect, authorizeRoles("rector", "admin"), createAnnouncement);
router.get("/", protect, authorizeRoles("student", "rector", "admin"), getAnnouncements);
router.delete("/:id", protect, authorizeRoles("rector", "admin"), deleteAnnouncement);

export default router;
