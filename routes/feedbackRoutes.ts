import express from "express";
import {
  getAllFeedback,
  getUserFeedback,
  postFeedback,
  updateFeedback,
  deleteFeedback,
} from "../controllers/feedbackController.ts";

const router = express.Router();

router.get("/", getAllFeedback);
router.get("/:userId", getUserFeedback)
router.post("/", postFeedback);
router.put("/:feedbackId", updateFeedback);
router.delete("/:feedbackId", deleteFeedback);

export default router;
