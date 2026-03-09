import type { Request, Response } from "express";
import {
  getAllFeedback as getAllFeedbackService,
  postFeedback as postFeedbackService,
  updateFeedback as updateFeedbackService,
  deleteFeedback as deleteFeedbackService,
} from "../services/feedbackService.ts";

export const getAllFeedback = async (_req: Request, res: Response) => {
  try {
    const feedback = await getAllFeedbackService();
    res.status(200).send(feedback);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

export const postFeedback = async (req: Request, res: Response) => {
  try {
    const {
      feedbackMessage,
      feedbackTeacherId,
      feedbackStudentId,
      feedbackProvinceId,
    } = req.body;

    await postFeedbackService(
      feedbackMessage,
      feedbackTeacherId,
      feedbackStudentId,
      feedbackProvinceId,
    );
    res.status(201).json({ message: "Feedback successfully created" });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

export const updateFeedback = async (req: Request, res: Response) => {
  try {
    const { feedbackId } = req.params;
    const { feedbackMessage } = req.body;

    await updateFeedbackService(
      feedbackId as string,
      feedbackMessage as string,
    );

    res.status(200).json({ message: "Feedback updated successfully" });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

export const deleteFeedback = async (req: Request, res: Response) => {
  try {
    const { feedbackId } = req.params;
    await deleteFeedbackService(feedbackId as string);
    res.status(200).json({ message: "Feedback deleted successfully" });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};
