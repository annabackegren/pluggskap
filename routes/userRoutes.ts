import express from 'express';
import {getUsers, addUser, loginUser, getUser} from '../controllers/userController.ts'

const router = express.Router()

router.get('/', getUsers)
router.get('/:id', getUser)
router.post('/', addUser)

router.post('/login', loginUser);


export default router
