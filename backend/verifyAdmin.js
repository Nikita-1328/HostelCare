import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/User.js";
import fs from "fs";

dotenv.config();

const verify = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        const user = await User.findOne({ email: "admin@hostelcare.com" });

        let message = "";
        if (user && user.role === "admin") {
            message = "VERIFICATION SUCCESS: " + JSON.stringify(user);
        } else {
            message = "VERIFICATION FAILED: " + JSON.stringify(user);
        }

        fs.writeFileSync("verification.txt", message);
        process.exit(0);
    } catch (err) {
        fs.writeFileSync("verification.txt", "ERROR: " + err.message);
        process.exit(1);
    }
};

verify();
