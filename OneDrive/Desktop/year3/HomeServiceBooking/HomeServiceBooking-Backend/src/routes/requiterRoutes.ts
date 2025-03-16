import express from "express";
import {
  addBusinessData,
  deleteRequiterData,
  getBusinessData,
  getBusinessDataById,
  getRequiterData,
  loginRequiter,
  registerRequiter,
  updateRequiterProfile,
} from "../controller/requiterController";
import upload from "../config/multer";
import { requiterAuthMiddleware } from "../middleware/requiterAuthMiddleware";

const router = express.Router();

router.post("/register-requiter", upload.single("profile"), registerRequiter);
router.post("/login-requiter", loginRequiter);
router.get("/getrequiterData", requiterAuthMiddleware, getRequiterData);
router.post(
  "/addBusiness",
  upload.array("images", 4),
  requiterAuthMiddleware,
  addBusinessData
);
router.get("/getBusinessData", getBusinessData);
router.get("/getBusinessDataById/:id", getBusinessDataById);

router.delete(
  "/deleteRequiterData",
  requiterAuthMiddleware,
  deleteRequiterData
);

router.put(
  "/updateRequiterProfile",
  requiterAuthMiddleware,
  upload.single("profileImage"),
  updateRequiterProfile
);

export default router;
