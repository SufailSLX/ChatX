import { Router } from "express";
import { getProfile } from "../controllers/userControllers.js";
import { protect } from "../middleware/authMiddleware.js";

const router = Router();

router.get("/profile", protect, getProfile);

export default router;
