import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import transporter from "../config/mailer.js";
import os from "os";

/* =====================================================
   CHECK EMAIL CONTROLLER (Real-time existence check)
   ===================================================== */
export const checkEmail = async (req, res) => {
  try {
    const { email } = req.query;
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const user = await User.findOne({ email });
    if (user) {
      return res.json({ exists: true, role: user.role });
    } else {
      return res.json({ exists: false });
    }
  } catch (error) {
    console.error("CHECK EMAIL ERROR:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

/* =====================================================
   LOGIN CONTROLLER
===================================================== */
export const loginUser = async (req, res) => {
  try {
    console.log("REQ BODY:", req.body);

    const { email, password } = req.body;

    console.log("EMAIL:", email);
    console.log("PASSWORD:", password);

    // 1️⃣ Find user by email
    const user = await User.findOne({ email });
    console.log("LOGIN ATTEMPT - EMAIL:", email);
    console.log("USER FOUND IN DB:", !!user);

    if (!user) {
      console.log("LOGIN FAILED: User not found");
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // 2️⃣ Compare password
    console.log("COMPARING PASSWORDS...");
    const isMatch = await bcrypt.compare(password, user.password);
    console.log("PASSWORD MATCH:", isMatch);

    if (!isMatch) {
      // ⚠️ Send Security Alert Email for failed attempt
      try {
        await transporter.sendMail({
          to: user.email,
          subject: "HostelCare Security Alert: Failed Login Attempt",
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #e0e0e0; padding: 20px; border-radius: 10px;">
              <h2 style="color: #4F46E5; text-align: center;">Security Alert</h2>
              <p>Hello <strong>${user.name}</strong>,</p>
              <p>A login attempt with an incorrect password was made for your HostelCare account.</p>
              <div style="background: #f9fafb; padding: 15px; border-radius: 8px; margin: 20px 0;">
                <p style="margin: 0;"><strong>Time:</strong> ${new Date().toLocaleString()}</p>
                <p style="margin: 0;"><strong>Platform:</strong> ${os.platform()}</p>
              </div>
              <p>If this was not you, please reset your password immediately using the "Forgot Password" link on the login page.</p>
              <p style="color: #6b7280; font-size: 0.9rem;">This is an automated security notification.</p>
            </div>
          `
        });
      } catch (mailErr) {
        console.error("FAILED TO SEND SECURITY EMAIL:", mailErr);
      }

      return res.status(400).json({ message: "Invalid credentials" });
    }

    // 3️⃣ Generate JWT (optional but recommended)
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET || "hostelcare_secret",
      { expiresIn: "1d" }
    );

    // 4️⃣ SUCCESS → send role FROM DATABASE
    return res.json({
      token,
      name: user.name,
      role: user.role
    });

  } catch (err) {
    console.error("LOGIN ERROR:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

/* =====================================================
   FORGOT PASSWORD CONTROLLER
===================================================== */
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Email not registered" });
    }

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Save OTP to DB (Expires in 10 mins)
    user.otp = otp;
    user.otpExpiry = Date.now() + 10 * 60 * 1000;
    await user.save();

    // Try to send email, but fallback to console log if no credentials
    try {
      if (process.env.EMAIL_USER && process.env.EMAIL_USER !== "your_email@gmail.com") {
        await transporter.sendMail({
          to: user.email,
          subject: "HostelCare Password Reset OTP",
          html: `
            <h3>Password Reset Request</h3>
            <p>Your OTP for password reset is:</p>
            <h2 style="color: #4F46E5;">${otp}</h2>
            <p>This code expires in 10 minutes. Do not share it with anyone.</p>
          `
        });
      } else {
        console.log(`\n\n============== 🔐 OTP CODE ==============`);
        console.log(`Email: ${email}`);
        console.log(`OTP:   ${otp}`);
        console.log(`===========================================\n\n`);
      }
    } catch (mailError) {
      console.log(`\n\n============== 🔐 OTP CODE (Fallback) ==============`);
      console.log(`Email: ${email}`);
      console.log(`OTP:   ${otp}`);
      console.log(`======================================================\n\n`);
      console.error("Mail Error:", mailError.message);
    }

    return res.json({ message: "OTP processed successfully" });

  } catch (error) {
    console.error("FORGOT PASSWORD ERROR:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

/* =====================================================
   RESET PASSWORD CONTROLLER (Forgot Password Flow)
===================================================== */
export const resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;

    const user = await User.findOne({
      email,
      otp,
      otpExpiry: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;
    user.otp = null;
    user.otpExpiry = null;
    await user.save();

    return res.json({ message: "Password updated successfully" });

  } catch (error) {
    console.error("RESET PASSWORD ERROR:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

/* =====================================================
   GET PROFILE CONTROLLER
===================================================== */
export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.json(user);
  } catch (error) {
    console.error("GET PROFILE ERROR:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

/* =====================================================
   CHANGE PASSWORD CONTROLLER (Logged In)
===================================================== */
export const changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Verify old password
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect current password" });
    }

    // Hash and save new password
    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    return res.json({ message: "Password changed successfully" });
  } catch (error) {
    console.error("CHANGE PASSWORD ERROR:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
