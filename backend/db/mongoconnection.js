import dotenv from 'dotenv'
import mongoose from 'mongoose'

dotenv.config();

const mongoconnection =async () => {
  try {
    await mongoose.connect(process.env.MONGODBURL)
    console.log("✅ Connected successfully to MongoDB");
  } catch (error) {
    console.error("❌ Failed to connect to MongoDB:");
  }
}


export default mongoconnection