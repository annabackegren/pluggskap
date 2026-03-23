import express from 'express';
const router = express.Router();


import verifyToken from '../middleware/userMiddleware.ts';

import { updateUser, deleteUser } from '../controllers/userController.ts';

router.get('/', verifyToken, (req, res) => {
    res.status(200).json({ message: 'Protected route accessed' });
});

router.put('/', verifyToken , updateUser)
router.delete('/:userId', verifyToken , deleteUser)

export default router
