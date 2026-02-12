import mongoose from "mongoose";
import "dotenv/config";

const URL = process.env.MONGODB_URL as string;

export async function ConnectDB() {
  try {
    await mongoose.connect(URL);
    console.log("Connection to the database established successfully.");
  } catch (err) {
    console.clear();
    console.error("The connection to the database failed.", err);
    process.exit();
  }
}
