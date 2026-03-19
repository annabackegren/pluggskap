import { databaseSQL } from "../connectionMySQL.ts";
import type { Result, AddResultDTO } from "../interfaces/resultInterface.ts";
import type { ResponseMessage } from "../interfaces/responseInterface.ts";

// ------------- GET ALL-------------
export const getAllResults = async (): Promise<Result[]> => {
  const [results] = await databaseSQL.query<Result[]>("SELECT * FROM result");

  return results;
};

// ------------- GET ONE-------------
export const getResults = async (
  resultUserId: number,
): Promise<Result[] | null> => {
  const [results] = await databaseSQL.query<Result[]>(
    "SELECT * FROM result WHERE resultUserId=? ORDER BY resultCreatedAt DESC",
    [resultUserId],
  );

  return results ?? null;
};

// ------------- GET All FOR 1 USER-------------
export const getAllResultsUser = async (
  resultUserId: number,
  resultProvinceId: string,
): Promise<Result[] | null> => {
  const [results] = await databaseSQL.query<Result[]>(
    "SELECT * FROM result WHERE resultUserId=? AND resultProvinceId=?  ORDER BY resultCreatedAt DESC",
    [resultUserId, resultProvinceId],
  );

  return results ?? null;
};

// ------------- POST -------------
export const addResult = async (request: AddResultDTO): Promise<void> => {
  await databaseSQL.execute(
    "INSERT INTO result (resultScore, resultUserId, resultProvinceId) VALUES (?, ?, ?)",
    [request.resultScore, request.resultUserId, request.resultProvinceId],
  );
};
