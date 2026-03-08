// import { request } from 'node:http';
import { database } from "../connectionMySQL.ts";
import type {
  User,
  UpdateUserDTO,
  PostUserDTO,
  DeleteUserDTO,
} from "../interfaces/userInterface.ts";

// ------------- GET ALL-------------
export const getAllUsers = async (): Promise<User[]> => {
  const [results] = await database.query<User[]>("SELECT * FROM user");

  return results;
};

// ------------- GET ONE-------------
export const getOneUser = async (userName: string): Promise<User | null> => {
  const [results] = await database.query<User[]>(
    "SELECT * FROM user WHERE userName=?",
    [userName],
  );

  return results[0] ?? null;
};

// ------------- PUT -------------
export const updateUser = async (request: UpdateUserDTO): Promise<void> => {
  await database.execute(
    "UPDATE user SET userType = ?, userName=?, userPassword=? WHERE userId=? ",
    [request.userType, request.userName, request.userPassword, request.userId],
  );
};

// ------------- POST -------------
export const addUser = async (request: PostUserDTO): Promise<void> => {
  await database.execute(
    "INSERT INTO user (userType, userName, userPassword) VALUES (?, ?, ?)",
    [request.userType, request.userName, request.userPassword],
  );
};

// ------------- DELETE -------------
export const deleteUser = async (data: DeleteUserDTO): Promise<void> => {
  if (data.userId === undefined || data.userId === null) {
    throw new Error("userId is required.");
  }

  await database.execute("DELETE FROM user WHERE userId=?", [data.userId]);
};
