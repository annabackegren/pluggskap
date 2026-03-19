import type { Request, Response } from 'express';
import { getAllResults, addResult as addResultService, getResults as getResultService, getAllResultsUser as getAllResultsUserService} from "../services/resultService.ts"
import type {ResponseMessage} from '../interfaces/responseInterface.ts'
import type { AddResultDTO, Result } from '../interfaces/resultInterface.ts';


// import dotenv from 'dotenv'

// dotenv.config()

// ------------- GET -------------
export const getResults = async (_req: Request, res: Response) => {
  try {
    const users = await getAllResults()

    res.status(200).send(users)
  } catch (error: any) {
    console.error(error);
    res.status(500).json({error: error.message})
  }
}

export const getAllResultsUser = async (_req: Request<{resultUserId: number, resultProvinceId: string}>, res: Response) => {
  try {
    const resultUserId = _req.params.resultUserId
    const resultProvinceId = _req.params.resultProvinceId

    const result = await getAllResultsUserService(resultUserId, resultProvinceId)

    res.status(200).send(result)
  } catch (error: any) {
    console.error(error);
    res.status(500).json({error: error.message})
  }
}

export const getResult = async (_req: Request<Result>, res: Response<Result[] | ResponseMessage | null>) => {
  try {

    const { id } = _req.params;
    const result = await getResultService(id)

    res.status(200).send(result)
  } catch (error: any) {
    console.error(error);
    res.status(500).json({error: error.message})
  }
}

// ------------- POST ADD -------------
export const addResult = async (_req: Request<{}, ResponseMessage, AddResultDTO>, res: Response<ResponseMessage>) => {
  try {
    const result: AddResultDTO = _req.body

    await addResultService(result)
    res.status(200).json({message: 'Result successfully posted.'})
  } catch (error: any) {
    console.error(error);
    res.status(500).json({message: error.message})
  }
}
