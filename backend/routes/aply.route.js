import express from "express";
import { createAply, getAply, getAplyById } from "../controllers/aply.controller.js";

const router = express.Router(); // Move this line up to initialize the router first

router.post("/create", createAply);
router.get("/get", getAply);
router.get("/getbyid/:id", getAplyById);

export default router;
