import {
  createUser,
  deleteUser,
  getUserData,
  UpdateUser,
} from "../service/user.js";
import { catchError } from "../service/userError.js";

export async function getUserById(req, res) {
  try {
    const userData = await getUserData(req, res);
    if (!userData) {
      return;
    }
    res.status(200).json({ success: true, result: userData });
  } catch (error) {
    catchError(error, res);
  }
}

// Create new account
export const createAnonymousUser = async (req, res) => {
  try {
    const newUser = await createUser(req, res);
    if (!newUser) {
      return;
    }
    res.status(201).json({ success: true, user: newUser });
  } catch (error) {
    catchError(error, res);
  }
};

// Delete user account
export const deleteAnonymousUser = async (req, res) => {
  try {
    await deleteUser(req, res);
  } catch (error) {
    catchError(error, res);
  }
};

// Updating user account
export const UpdateAnonymousUser = async (req, res) => {
  try {
    await UpdateUser(req, res);
  } catch (error) {
    catchError(error, res);
  }
};
