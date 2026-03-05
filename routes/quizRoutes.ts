import express from 'express';
import {getQuestion, getQuestionOne} from '../controllers/quizController.ts'

const router = express.Router()

router.get('/', getQuestion)
router.get('/:id', getQuestionOne)


export default router
