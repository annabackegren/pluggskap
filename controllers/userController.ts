import type { Request, Response } from 'express';
import { getAllUsers, updateUser as updateUserService, addUser as addUserService, deleteUser as deleteUserService, getOneUser } from "../services/userService.js"
import type {ResponseMessage} from '../interfaces/responseInterface.ts'
import type { PostUserDTO, LoginUserDTO, UpdateUserDTO, User } from '../interfaces/userInterface.ts';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

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


export const getUser = async (_req: Request<User>, res: Response<User | ResponseMessage | null>) => {
  try {

    const { id } = _req.params;
    const user = await getOneUser(id)

    res.status(200).send(user)
  } catch (error: any) {
    console.error(error);
    res.status(500).json({error: error.message})
  }
}

// ------------- PUT -------------
export const updateUser = async (_req: Request<{}, ResponseMessage, UpdateUserDTO>, res: Response<ResponseMessage>) => {
  try {
    const user: UpdateUserDTO = _req.body
    const hashedPassword = await bcrypt.hash(user.userPassword, 10)
    const updatedUser: UpdateUserDTO =  {...user, userPassword: hashedPassword}

    await updateUserService(updatedUser)

    res.status(200).json({message: 'User successfully updated.'})
  } catch (error: any) {
    console.error(error);
    res.status(500).json({message: error.message})
  }
}

// ------------- POST ADD -------------
export const addUser = async (_req: Request<{}, ResponseMessage, PostUserDTO>, res: Response<ResponseMessage>) => {
  try {
    const user: PostUserDTO = _req.body
    const hashedPassword = await bcrypt.hash(user.userPassword, 10)
    const newUser: PostUserDTO =  {...user, userPassword: hashedPassword}

    await addUserService(newUser)
    res.status(200).json({message: 'User successfully posted.'})
  } catch (error: any) {
    console.error(error);
    res.status(500).json({message: error.message})
  }
}

// ------------- POST LOGIN-------------
export const loginUser = async (_req: Request<{}, ResponseMessage, LoginUserDTO>, res: Response<ResponseMessage>) => {
  try {
    const user: LoginUserDTO = _req.body
    const findUser = await getOneUser(user.userName)

        if (!findUser) {
            return res.status(401).json({ message: 'Det gick inte att logga in med din användare!' });
        }
        const passwordMatch = await bcrypt.compare(user.userPassword, findUser.userPassword);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Ditt lösenord är inte korrekt!' });
        }

            const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET as string, {
                expiresIn: '1h',
            });
            res.status(200).json(
                {
                    token,
                    message: 'Du är inloggad!'
                });
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
