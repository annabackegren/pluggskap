import express from 'express';
import {getResult, addResult} from '../controllers/resultController.ts'

const router = express.Router()

router.get('/', getResult)
router.post('/', addResult)


export default router
