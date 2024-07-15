import express from "express";
import { createAply, getAply, getAplyById } from "../controllers/aply.controller.js";

router.post("/create", createAply);


const router = express.Router();
export default router;