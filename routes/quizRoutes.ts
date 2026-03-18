import express from 'express';
import {getQuestion, getAllByProvince, getQuizQuestions, getQuizCountryQuestions} from '../controllers/quizController.ts'

const router = express.Router()

router.get('/country', getQuizCountryQuestions)
router.get('/:id', getQuizQuestions)
router.get('/', getQuestion)



export default router

// router.get('/:id', getAllByProvince)
