import { databaseSQL } from '../connectionMySQL.ts'
import type { Question } from '../interfaces/quizInterface.ts'
import type {ResponseMessage} from '../interfaces/responseInterface.ts'

// ------------- GET ALL-------------
export const getAllQuestions = async (): Promise<Question[]> => {
    const [results] = await databaseSQL.query<Question[]>(
        'SELECT * FROM question'
    );

    return results
}

// ------------- GET ONE-------------
export const getOneQuestion = async (questionProvinceId: string): Promise<Question[] | null> => {
    const [results] = await databaseSQL.query<Question[]>(
        'SELECT * FROM question WHERE questionProvinceId=?', [questionProvinceId]
    );

    return results ?? null
}
