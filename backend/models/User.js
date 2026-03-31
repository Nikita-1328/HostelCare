import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: { type: String, required: false },
  googleId: { type: String, unique: true, sparse: true },
  role: { type: String, enum: ["admin", "rector", "student"], default: "student" },
  otp: String,
  otpExpiry: Date
});

export default mongoose.model("User", userSchema);
