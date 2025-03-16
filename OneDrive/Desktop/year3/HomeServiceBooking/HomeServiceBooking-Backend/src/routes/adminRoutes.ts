import express from "express";
import { requiterAuthMiddleware } from "../middleware/requiterAuthMiddleware";
import { getAllUsers } from "../controller/adminController";

const router = express.Router();

router.get("/getAllUsers", requiterAuthMiddleware, getAllUsers);

export default router;
