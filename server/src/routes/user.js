import express from "express";
import {
  createAnonymousUser,
  deleteAnonymousUser,
  UpdateAnonymousUser,
  getUserById,
} from "../controllers/user.js";
import { isIdValid, isUserTypeObject } from "../middlewares/checkUser.js";

const userRouter = express.Router();

// Getting user by ID
userRouter.get("/:id", isIdValid, getUserById);
// Creating new user account
userRouter.post("/", isUserTypeObject, createAnonymousUser);
// Deleting a user
userRouter.delete("/:id", isIdValid, deleteAnonymousUser);
//Updating user
userRouter.put("/:id", isUserTypeObject, isIdValid, UpdateAnonymousUser);

export default userRouter;
