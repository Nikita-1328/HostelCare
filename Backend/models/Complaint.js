import mongoose from "mongoose";

const complaintSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    category: {
      type: String,
      enum: ["Electrician", "Plumber", "Carpenter", "Cleaning"],
      required: true,
    },
    subCategory: {
      type: String, // e.g. "washroom", "room" for Cleaning
      default: null,
    },
    problem: {
      type: String,
      required: true,
    },
    proof: {
      type: String, // Store filename or base64 or URL
      default: null,
    },
    status: {
      type: String,
      enum: ["Pending", "In Progress", "Resolved", "Rejected"],
      default: "Pending",
    },
    assignedWorker: {
      name: { type: String, default: "" },
      phone: { type: String, default: "" },
      role: { type: String, default: "" },
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Complaint", complaintSchema);
