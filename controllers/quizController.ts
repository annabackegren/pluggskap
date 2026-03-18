import type { Request, Response } from 'express';
import { getAllQuestions, getAllQuestionsByProvince, getQuizQuestions as getQuizQuestionsByService, getCountryQuestions} from "../services/quizService.ts"
import type {ResponseMessage} from '../interfaces/responseInterface.ts'
import type { Question } from '../interfaces/quizInterface.ts';

// import dotenv from 'dotenv'

// dotenv.config()

// ------------- GET -------------
export const getQuestion = async (_req: Request, res: Response) => {
  try {
    const users = await getAllQuestions()

    res.status(200).send(users)
  } catch (error: any) {
    console.error(error);
    res.status(500).json({error: error.message})
  }
}

export const getAllByProvince = async (_req: Request<Question>, res: Response<Question[] | ResponseMessage | null>) => {
  try {
    const { id } = _req.params;

   if(!id){
      return res.status(400).json({error: 'Could not find any province id'})
    }

    const question = await getAllQuestionsByProvince(id)

     res.status(200).send(question)
  } catch (error: any) {
    console.error(error);
    res.status(500).json({error: error.message})
  }
}

export const getQuizQuestions = async (_req: Request<Question>, res: Response<Question[] | ResponseMessage | null>) => {
  try {

    const { id } = _req.params;

        if(!id){
      return res.status(400).json({error: 'Could not find any province id'})
    }

    const question = await getQuizQuestionsByService(id)


    res.status(200).send(question)
  } catch (error: any) {
    console.error(error);
    res.status(500).json({error: error.message})
  }
}

export const getQuizCountryQuestions = async (_req: Request, res: Response) => {
  try {
    const question = await getCountryQuestions()
    
    res.status(200).send(question)
  } catch (error: any) {
    console.error(error);
    res.status(500).json({error: error.message})
  }
}
