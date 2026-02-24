import express from 'express';
import {getUsers, updateUser, addUser, deleteUser, loginUser} from '../controllers/userController.ts'

const router = express.Router()

router.get('/', getUsers)
router.post('/', addUser)

router.post('/login', loginUser);


export default router
