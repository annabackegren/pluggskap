import type { Request, Response } from "express";
import { databaseSQL } from "../connectionMySQL.js";

export const getAllFeedback = async (_req: Request, res: Response) => {
  try {
    const [feedback] = await databaseSQL.query("SELECT * FROM feedback");
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
    await databaseSQL.execute(
      "INSERT INTO feedback(feedbackMessage, feedbackTeacherId, feedbackStudentId, feedbackProvinceId) VALUES (?, ?, ?, ?)",
      [
        feedbackMessage,
        feedbackTeacherId,
        feedbackStudentId,
        feedbackProvinceId,
      ],
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

    await databaseSQL.execute(
      "UPDATE feedback SET feedbackMessage = ? WHERE feedbackId = ?",
      [feedbackMessage, feedbackId],
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
    await databaseSQL.execute("DELETE FROM feedback WHERE feedbackId = ?", [
      feedbackId,
    ]);
    res.status(200).json({ message: "Feedback deleted successfully" });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};
