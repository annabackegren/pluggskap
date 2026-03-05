import express from 'express';
import {getResult, addResult, getResults} from '../controllers/resultController.ts'

const router = express.Router()

router.get('/', getResults)
router.get('/:id', getResult)
router.post('/', addResult)


export default router
