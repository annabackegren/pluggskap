import type { Request, Response } from 'express';
import { getAllUsers, updateUser as updateUserService, addUser as addUserService, deleteUser as deleteUserService } from "../services/userService.js"
import type {ResponseMessage} from '../interfaces/responseInterface.ts'
import type { PostUserDTO, UpdateUserDTO } from '../interfaces/userInterface.ts';

// ------------- GET -------------
export const getUsers = async (_req: Request, res: Response) => {
  try {
    const users = await getAllUsers()

    res.status(200).send(users)
  } catch (error: any) {
    console.error(error);
    res.status(500).json({error: error.message})
  }
}

// ------------- PUT -------------
export const updateUser = async (_req: Request<{}, ResponseMessage, UpdateUserDTO>, res: Response<ResponseMessage>) => {
  try {
    const data: UpdateUserDTO = _req.body
    
    await updateUserService(data)

    res.status(200).json({message: 'User successfully updated.'})
  } catch (error: any) {
    console.error(error);
    res.status(500).json({message: error.message})
  }
}

// ------------- POST -------------
export const addUser = async (_req: Request<{}, ResponseMessage, PostUserDTO>, res: Response<ResponseMessage>) => {
  try {
    const data: PostUserDTO = _req.body
    
    await addUserService(data)

    res.status(200).json({message: 'User successfully posted.'})
  } catch (error: any) {
    console.error(error);
    res.status(500).json({message: error.message})
  }
}

// ------------- DELETE -------------
export const deleteUser = async (_req: Request<{userId: string}, ResponseMessage>, res: Response<ResponseMessage>) => {
  try {
    const userId = parseInt(_req.params.userId, 10)

    if(isNaN(userId)) throw new Error('Invalid userId')

    await deleteUserService({userId})   

    res.status(200).json({message: 'User successfully deleted.'})
  } catch (error: any) {
    console.error(error);
    res.status(500).json({message: error.message})
  }
}