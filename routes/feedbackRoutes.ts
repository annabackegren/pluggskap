import express from "express";
import {
  getAllFeedback,
  postFeedback,
  updateFeedback,
  deleteFeedback,
} from "../controllers/feedbackController.ts";

const router = express.Router();

router.get("/", getAllFeedback);
router.post("/", postFeedback);
router.put("/:feedbackId", updateFeedback);
router.delete("/:feedbackId", deleteFeedback);

export default router;
