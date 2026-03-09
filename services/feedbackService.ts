import { databaseSQL } from "../connectionMySQL.ts";

// ------ GET ALL -------
export const getAllFeedback = async () => {
  const [results] = await databaseSQL.query("SELECT * FROM feedback");
  return results;
};

// ------- POST -------

export const postFeedback = async (
  feedbackMessage: string,
  feedbackTeacherId: number,
  feedbackStudentId: number,
  feedbackProvinceId: string,
) => {
  await databaseSQL.execute(
    "INSERT INTO feedback(feedbackMessage, feedbackTeacherId, feedbackStudentId, feedbackProvinceId) VALUES (?, ?, ?, ?)",
    [feedbackMessage, feedbackTeacherId, feedbackStudentId, feedbackProvinceId],
  );
};

// ------ PUT ------

export const updateFeedback = async (
  feedbackId: string | undefined,
  feedbackMessage: string,
) => {
  await databaseSQL.execute(
    "UPDATE feedback SET feedbackMessage = ? WHERE feedbackId = ?",
    [feedbackMessage, feedbackId],
  );
};

// ------- DELETE------

export const deleteFeedback = async (feedbackId: string | undefined) => {
  await databaseSQL.execute("DELETE FROM feedback WHERE feedbackId = ?", [
    feedbackId,
  ]);
};
