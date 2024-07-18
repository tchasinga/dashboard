import dotenv from 'dotenv'
import mongoose from 'mongoose'

dotenv.config();

const urlmongoDB = process.env.MONGODB_URL;
const mongoconnection =async () => {
  try {
    mongoose
    .connect(urlmongoDB, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
      console.log("✅ Connected successfully to MongoDB");
    })
  } catch (error) {
    console.error("❌ Failed to connect to MongoDB:");
  }
}


export default mongoconnection