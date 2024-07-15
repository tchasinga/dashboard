import express from "express";
import { createAply, getAply, getAplyById } from "../controllers/aply.controller.js";

router.post("/create", createAply);
router.get("/get", getAply);
router.get("/get/:id", getAplyById);


const router = express.Router();
export default router;