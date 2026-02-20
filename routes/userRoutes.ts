import express from 'express';
import {getUsers, updateUser, addUser, deleteUser} from '../controllers/userController.ts'

const router = express.Router()

router.get('/', getUsers)
router.put('/', updateUser)
router.post('/', addUser)
router.delete('/:userId', deleteUser)

export default router