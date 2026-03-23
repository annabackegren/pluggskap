import { databaseSQL } from "../connectionMySQL.ts";
import type { Question } from "../interfaces/quizInterface.ts";

// ------------- GET ALL-------------
export const getAllQuestions = async (): Promise<Question[]> => {
  const [results] = await databaseSQL.query<Question[]>("SELECT * FROM question");

  return results;
};

// ------------- GET ALL BY PROVINCE ID -------------
// export const getAllQuestionsByProvince = async (
//   questionProvinceId: string,
// ): Promise<Question[] | null> => {
//   const [results] = await databaseSQL.query<Question[]>(
//     "SELECT * FROM question WHERE questionProvinceId=?",
//     [questionProvinceId],
//   );

//   return results ?? null;
// };

// ------------- GET ALL FOR GAME -------------
export const getQuizQuestions = async (
  questionProvinceId: string,
): Promise<Question[] | null> => {
  const [results] = await databaseSQL.query<Question[]>(
    `SELECT * FROM question 
    WHERE questionProvinceId=?
    ORDER BY RAND()
    LIMIT 5`,
    [questionProvinceId],
  );

  return results ?? null;
};

// ------------- GET ALL FOR COUNTRY GAME -------------
export const getCountryQuestions = async (): 
Promise<Question[] | null> => {
  const [results] = await databaseSQL.query<Question[]>(
    `SELECT * FROM question 
    ORDER BY RAND()
    LIMIT 5`,
  );

  return results ?? null;
};