import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import { errorMiddleware } from "./middleware/errorMiddlewares.js";
import  authRouter  from "./routes/authRouter.js";
import  sequelize  from "./database/db.js";

dotenv.config({ path: "./config/config.env" });

export const app = express();

// Middlewares
app.use(
  cors({
    origin: [process.env.URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/auth", authRouter);
try {
  await sequelize.authenticate();
  console.log("✅ Database connected successfully");
} catch (error) {
  console.error("❌ Database connection failed:", error);
}

app.use(errorMiddleware);