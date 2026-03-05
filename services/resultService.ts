import { databaseSQL } from '../connectionMySQL.ts'
import type { Result, AddResultDTO } from '../interfaces/resultInterface.ts'
import type {ResponseMessage} from '../interfaces/responseInterface.ts'

// ------------- GET ALL-------------
export const getAllResults = async (): Promise<Result[]> => {
    const [results] = await databaseSQL.query<Result[]>(
        'SELECT * FROM result'
    );

    return results
}

// ------------- POST -------------
export const addResult = async (request: AddResultDTO): Promise<void> => {
    await databaseSQL.execute(
      'INSERT INTO result (resultScore, resultUserId, resultProvinceId) VALUES (?, ?, ?)',
      [request.resultScore, request.resultUserId, request.resultProvinceId]
    )
}
