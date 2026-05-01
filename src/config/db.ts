import mongoose from "mongoose";
import config from "./config.js";

const { MONGO_URI } = config;

if (!MONGO_URI) throw new Error("MONGO_URI not defined");

const connectDB = async () => {
	try {
		await mongoose.connect(MONGO_URI);
		console.log("MongoDB connected");
	} catch (error) {
		if (error instanceof Error) {
			console.error("Failed to fetch user:", error.message);
		}
		process.exit(1);
	}
};

export default connectDB;
