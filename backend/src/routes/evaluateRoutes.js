import express from "express";
import { evaluateIdea, getEvaluationById } from "../controllers/evaluateController.js";
import { authRequired } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/evaluate-idea", authRequired, evaluateIdea);
router.get("/evaluation/:resultId", authRequired, getEvaluationById);

export default router;

