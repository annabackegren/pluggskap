import { databaseSQL } from "../connectionMySQL.ts";
import type { RowDataPacket } from "mysql2";
import {database} from "../connectionMongoDB.ts"

// ------ GET ALL -------
export const getAllFeedback = async () => {
  const [results] = await databaseSQL.query("SELECT * FROM feedback");
  return results;
};

// ------ GET ALL WHERE USER -------
export const getUserFeedback = async (userName: string) => {
  const [feedback] = await databaseSQL.query<RowDataPacket[]>(
`SELECT f.feedbackMessage, f.feedbackProvinceId 
FROM feedback f JOIN user u ON f.feedbackStudentId = u.userId 
WHERE u.userName=?`, 
   [userName]
  );

  const result = await Promise.all(
    (feedback as any[]).map(async fedbackObject => {
      const province = await database
      .collection("provinces")
      .findOne({id: fedbackObject.feedbackProvinceId})

      return{
        ...fedbackObject,
        provinceName: province?.name || "Okänt landskap",
      }
    })
  )  
  return result;
};

// ------ GET ALL WHERE USER BY PROVINCE-------
export const getUserFeedbackByProvince = async (userName: string, provinceId: string) => {
  const [result] = await databaseSQL.query<RowDataPacket[]>(
`SELECT f.feedbackMessage
FROM feedback f JOIN user u ON f.feedbackStudentId = u.userId 
WHERE u.userName=? AND f.feedbackProvinceId = ?`, 
   [userName, provinceId]
  );

  console.log("result är: ", result);
  return result;
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
