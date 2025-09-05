import express from "express";
import userRoutes from "./api/user/user.route";

// routes
const router = express.Router();
router.use("/users", userRoutes);

export default router;
