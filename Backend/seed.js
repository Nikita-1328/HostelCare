import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import User from "./models/User.js";
import Announcement from "./models/Announcement.js";
import Complaint from "./models/Complaint.js";
import GatePass from "./models/GatePass.js";

dotenv.config();

const seedDB = async () => {
  try {
    // Connect to database
    console.log("Connecting to database at:", process.env.MONGO_URI);
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected for seeding");

    // Clean current database data
    await User.deleteMany({});
    await Announcement.deleteMany({});
    await Complaint.deleteMany({});
    await GatePass.deleteMany({});
    console.log("Cleared existing data from all collections");

    // Hash passwords
    const salt = await bcrypt.genSalt(10);
    const adminPassword = await bcrypt.hash("password", salt);
    const rectorPassword = await bcrypt.hash("password1", salt);
    const studentPassword = await bcrypt.hash("password2", salt);

    // Create users
    const admin = await User.create({
      name: "Administrator",
      email: "admin@hostelcare.com",
      password: adminPassword,
      role: "admin",
    });

    const rector = await User.create({
      name: "Mrs. Priya Kumar",
      email: "rector@hostelcare.com",
      password: rectorPassword,
      role: "rector",
    });

    const student = await User.create({
      name: "Anjali Sharma",
      email: "student@hostelcare.com",
      password: studentPassword,
      role: "student",
    });

    console.log("Created users:", {
      admin: admin.email,
      rector: rector.email,
      student: student.email,
    });

    // Create sample announcements
    const ann1 = await Announcement.create({
      title: "Annual Hostel Night 2026",
      content: "Registrations are now open for cultural performances. Contact your floor representative.",
      category: "Event",
      color: "#4e73df",
      author: rector._id,
    });

    const ann2 = await Announcement.create({
      title: "Maintenance Alert",
      content: "Water supply interruption today from 2:00 PM to 5:00 PM due to tank maintenance.",
      category: "Maintenance",
      color: "#e74a3b",
      author: rector._id,
    });

    console.log("Created sample announcements");

    // Create sample complaints
    const comp1 = await Complaint.create({
      student: student._id,
      category: "Electrician",
      problem: "Fan speed regulator broken in room 302",
      status: "In Progress",
    });

    const comp2 = await Complaint.create({
      student: student._id,
      category: "Plumber",
      problem: "Taps leaking in room 302 washroom",
      status: "Resolved",
    });

    console.log("Created sample complaints");

    // Create sample gate passes
    const gp1 = await GatePass.create({
      student: student._id,
      reason: "Home Visit for festival",
      fromDate: new Date("2026-02-12"),
      toDate: new Date("2026-02-15"),
      noOfDays: 3,
      destination: "Lucknow",
      contactNo: "+91 70001 23456",
      parentContactNo: "+91 94444 55555",
      timeFrom: "09:00 AM",
      timeTo: "06:00 PM",
      status: "Approved",
    });

    const gp2 = await GatePass.create({
      student: student._id,
      reason: "Local outing for groceries",
      fromDate: new Date("2026-02-18"),
      toDate: new Date("2026-02-18"),
      noOfDays: 1,
      destination: "Local Market",
      contactNo: "+91 70001 23456",
      parentContactNo: "+91 94444 55555",
      timeFrom: "04:00 PM",
      timeTo: "08:00 PM",
      status: "Pending",
    });

    console.log("Created sample gate passes");
    console.log("Database seeded successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seedDB();
