
import { databaseSQL } from '../connectionMySQL.ts'
import type {User, UpdateUserDTO, PostUserDTO, DeleteUserDTO} from '../interfaces/userInterface.ts'

// ------------- GET -------------
export const getAllUsers = async (): Promise<User[]> => {
    const [results] = await databaseSQL.query<User[]>(
        'SELECT * FROM user'
    );
    
    return results
}

// ------------- PUT -------------
export const updateUser = async (request: UpdateUserDTO): Promise<void> => {
    await databaseSQL.execute(
    'UPDATE user SET userType = ?, userFirstName= ?, userLastName=?, userName=?, userPassword=? WHERE userId=? ',
    [request.userType, request.userFirstName, request.userLastName, request.userName, request.userPassword, request.userId]
    );
}

// ------------- POST -------------
export const addUser = async (request: PostUserDTO): Promise<void> => {
    await databaseSQL.execute(
      'INSERT INTO user (userType, userFirstName, userLastName, userName, userPassword) VALUES (?, ?, ?, ?, ?)',
      [request.userType, request.userFirstName, request.userLastName, request.userName, request.userPassword]
    )
}

// ------------- DELETE -------------
export const deleteUser = async (data: DeleteUserDTO): Promise<void> => {
    if (data.userId === undefined || data.userId === null){
        throw new Error('userId is required.')
    }

    await databaseSQL.execute(
      'DELETE FROM user WHERE userId=?',
      [data.userId]
    )
}
