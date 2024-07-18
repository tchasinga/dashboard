import dotenv from 'dotenv'
import mongoose from 'mongoose'

dotenv.config();

const mongoconnection =async () => {
  try {
    await mongoose.connect(process.env.MONGODBURL) || "mongodb+srv://tchasingajacques:202050081@mydashboardpanel.lsnxpki.mongodb.net/mydashboardpanel?retryWrites=true&w=majority&appName=mydashboardpanel"
    console.log("✅ Connected successfully to MongoDB");
  } catch (error) {
    console.error("❌ Failed to connect to MongoDB:");
  }
}


export default mongoconnection