import express from "express";
import upload from "../config/multer";
import { UserAuthMiddleware } from "../middleware/userAuthMiddleware";
import {
  deleteUserData,
  getUserData,
  loginUser,
  registerUser,
  updateUserProfile,
} from "../controller/userController";

const router = express.Router();

router.post("/register-user", upload.single("profile"), registerUser);
router.post("/login-user", loginUser);
router.get("/getUserData", UserAuthMiddleware, getUserData);

router.delete("/deleteUserData", UserAuthMiddleware, deleteUserData);

router.put(
  "/updateUserProfile",
  UserAuthMiddleware,
  upload.single("profileImage"),
  updateUserProfile
);

export default router;
