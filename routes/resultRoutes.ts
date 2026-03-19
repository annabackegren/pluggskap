import express from 'express';
import {getResult, addResult, getResults, getAllResultsUser} from '../controllers/resultController.ts'

const router = express.Router()

router.get('/', getResults)
router.get('/:id', getResult)
router.get('/:resultUserId/:resultProvinceId', getAllResultsUser)
router.post('/', addResult)


export default router
