import express from "express";
import { register } from "../controllers/authController.js";
import e from "express";

const router = express.Router();

router.post("/register", register);     

export default router;
