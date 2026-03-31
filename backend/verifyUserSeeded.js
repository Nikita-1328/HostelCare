import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/User.js";

dotenv.config();

const verify = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        const user = await User.findOne({ email: "2303031240714@paruluniversity.ac.in" });
        if (user) {
            console.log("✅ User Found:", user.email, "Role:", user.role);
        } else {
            console.log("❌ User NOT Found");
        }
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

verify();
