import type { RowDataPacket } from 'mysql2'

export interface User extends RowDataPacket {
  userId: number,
  userType: string,
  userName: string,
  userPassword: string
}

export interface UpdateUserDTO {
  userId: number,
  userType: string,
  userName: string,
  userPassword: string
}

export type PostUserDTO = Omit<UpdateUserDTO, 'userId'>

export type LoginUserDTO = Omit<User, 'userId, userType'>

export interface DeleteUserDTO{
  userId: number
}
