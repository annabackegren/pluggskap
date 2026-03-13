import express from "express";
import {
  getAllFeedback,
  getUserFeedback,
  getUserFeedbackByProvince,
  postFeedback,
  updateFeedback,
  deleteFeedback,
} from "../controllers/feedbackController.ts";

const router = express.Router();

router.get("/", getAllFeedback);
router.get("/:userName", getUserFeedback);
router.get("/:userName/province/:provinceId", getUserFeedbackByProvince);
router.post("/", postFeedback);
router.put("/:feedbackId", updateFeedback);
router.delete("/:feedbackId", deleteFeedback);

export default router;
