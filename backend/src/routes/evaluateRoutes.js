import express from "express";
import { evaluateIdea, getEvaluationById } from "../controllers/evaluateController.js";

const router = express.Router();

router.post("/evaluate-idea", evaluateIdea);
router.get("/evaluation/:resultId", getEvaluationById);

export default router;

