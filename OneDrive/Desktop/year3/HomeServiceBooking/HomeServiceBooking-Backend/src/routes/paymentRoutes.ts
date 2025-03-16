import express from "express";
import { UserAuthMiddleware } from "../middleware/userAuthMiddleware";
import { khaltiPayment, khaltiLookup } from "../controller/paymentController";

const router = express.Router();

router.post("/khalti", UserAuthMiddleware, khaltiPayment);
router.post("/khalti-lookup", khaltiLookup);

export default router;
