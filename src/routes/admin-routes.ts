import { CreateAdminController } from "../controllers/createAdminController";
import { LoginController } from "../controllers/loginUserControoler";
import { authMiddleware } from "../middleware/authMiddleware";
import { isAdmin } from "../middleware/adminMiddlware";
import { Router, Request, Response } from "express";

const router = Router();

router.get(
  "/me", 
  authMiddleware,
  (req: Request, res: Response) => {
  return res.json({
    message: "JWT's super secret sacred route",
    user: req.user,
  });
});

router.post(
  "/login", 
  new LoginController().handle);

router.post(
  "/admin",
  authMiddleware,
  isAdmin,
  new CreateAdminController().handle,
);

export default router;
