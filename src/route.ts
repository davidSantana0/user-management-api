import userRoutes from "./routes/user-routes";
import authRoutes from "./routes/admin-routes";
import { Router } from "express";

const router = Router();

router.use("/user", userRoutes);
router.use("/auth", authRoutes);

export default router;
