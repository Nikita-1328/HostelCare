import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/User.js";
import fs from "fs";

dotenv.config();

const verifyToFile = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        const users = await User.find({}, "name email role");
        const output = `Count: ${users.length}\nUsers:\n${JSON.stringify(users, null, 2)}`;
        fs.writeFileSync("db_status.txt", output);
        console.log("Written to db_status.txt");
        process.exit();
    } catch (err) {
        fs.writeFileSync("db_status.txt", `Error: ${err.message}`);
        process.exit(1);
    }
};

verifyToFile();
