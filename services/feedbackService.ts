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
`SELECT f.feedbackMessage, f.feedbackProvinceId, f.feedbackCreatedAt ,t.userName as teacherName
FROM feedback f 
JOIN user s ON f.feedbackStudentId = s.userId 
JOIN user t on f.feedbackTeacherId = t.userId
WHERE s.userName=? 
ORDER BY f.feedbackCreatedAt DESC 
LIMIT 10`, 
   [userName]
  );

  const result = await Promise.all(
    (feedback as any[]).map(async feedbackObject => {
      const province = await database
      .collection("provinces")
      .findOne({id: feedbackObject.feedbackProvinceId})

      return{
        ...feedbackObject,
        provinceName: province?.name || "Okänt landskap",
      }
    })
  )  
  return result;
};

// ------ GET ALL WHERE USER BY PROVINCE-------
export const getUserFeedbackByProvince = async (userName: string, provinceId: string) => {
  const [result] = await databaseSQL.query<RowDataPacket[]>(
`SELECT f.feedbackMessage, f.feedbackCreatedAt, t.userName as teacherName
FROM feedback f 
JOIN user u ON f.feedbackStudentId = u.userId 
JOIN user t on f.feedbackTeacherId = t.userId
WHERE u.userName=? AND f.feedbackProvinceId = ?
ORDER BY f.feedbackCreatedAt DESC
LIMIT 4`, 
   [userName, provinceId]
  );

  // console.log("result är: ", result);
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
