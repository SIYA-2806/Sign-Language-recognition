import express from "express";
import { addAnswer, addQuestion, allQuestion } from "../controllers/questionController.js"


const router = express.Router();

router.get("/all", allQuestion)
router.post("/addQuestion", addQuestion)
router.post("/addAnswer", addAnswer)



export default router