import { CreateUserController } from "../controllers/createUserController";
import { SearchUserController } from "../controllers/searchUserController";
import { UpdateUserController } from "../controllers/updateUserController";
import { DeleteUserController } from "../controllers/deleteUserController";
import { UserByIdController } from "../controllers/userByIdController";
import { emptyFields } from "../middleware/Data-Verification";
import { authMiddleware } from "../middleware/authMiddleware";
import { checkObjectId } from "../middleware/ValidationId";
import { isAdmin } from "../middleware/adminMiddlware";
import { Router } from "express";

const router = Router();
router.post(
  "/",
  emptyFields,
  new CreateUserController().handle,
);
router.get("/", new SearchUserController().handle);

router.get(
  "/:id",
  checkObjectId, 
  new UserByIdController().handle);

router.put(
  "/:id",
  authMiddleware,
  checkObjectId,
  new UpdateUserController().handle);

router.delete(
  "/:id",
  authMiddleware,
  isAdmin,
  checkObjectId,
  new DeleteUserController().handle,
);

export default router;
