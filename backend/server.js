import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import mongoconnection from "./db/mongoconnection.js";
import autoApply from "./routes/aply.route.js";

// initialization
const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "*",
      "https://messagge-tchatting.onrender.com",
    ],
    credentials: true,
    allowedHeaders: "*", // or list specific headers if needed
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS", "HEAD"],
  })
);

dotenv.config();
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(cookieParser());

app.listen(PORT, () => {
    mongoconnection();
    console.log(`server is running on port ${PORT}`);
  });

//   Aidding soem APis
app.use('/apis/aply', autoApply);