import User, { validateUser } from "../models/user.js";
import Event from "../models/event.js";
import validationErrorMessage from "../util/validationErrorMessage.js";
import { verifyHashPassword } from "../service/verifyHashPassword.js";
import { BadRequestError } from "./userError.js";

// Create a user
export const createUser = async (req, res) => {
  const { user } = req.body;
  const isValid = checkValidation(user, res);
  if (isValid) {
    const { email, phone } = user;
    if (!email) {
      throw Error(BadRequestError("BAD REQUEST: Email is a required field"));
    }
    const userByEmail = await User.findOne({ email });
    const userByPhone = await User.findOne({ phone });
    const userFound = userByEmail || userByPhone;
    if (userFound) {
      if (userFound.role === "attendee") {
        return {
          _id: userFound._id.toString(),
          email: userFound.email,
          phone: userFound.phone,
        };
      }
    }
    if (userByEmail || userByPhone) {
      throw Error(BadRequestError(handleMessage(userByEmail, userByPhone)));
    }
    const newUser = await User.create(user);
    return newUser;
  }
};

// Update a user
export const UpdateUser = async (req, res) => {
  const { user } = req.body;
  const userId = req.params.id;
  const isValid = checkValidation(user, res);
  if (isValid) {
    await User.findByIdAndUpdate(userId, user);
    res.status(200).json({ success: true, result: user });
  }
};

// Delete a user
export const deleteUser = async (req, res) => {
  const userId = req.params.id;
  const user = await User.findByIdAndDelete(userId);
  if (user) {
    user.eventIds.forEach(
      async (id) =>
        await Event.findByIdAndUpdate(id, {
          $pull: { AttendeeIds: userId },
        })
    );
    res.status(200).json({ msg: "Deleting the user is done!", success: true });
  } else {
    res
      .status(400)
      .json({ msg: "Can not find user by this id.", success: false });
  }
};

// Get user by email || ID
export const getUserData = async (req) => {
  const userId = req.params.id;
  const email = req.body.user?.email;
  const password = req.body.user?.password;
  if (!email && !userId) {
    throw Error(BadRequestError("Please, send email or id!"));
  }
  let userData = null;
  if (userId) {
    userData = await User.findById(userId);
  } else if (email) {
    userData = await User.findOne({ email: email });
  }
  if (!userData) {
    throw Error(BadRequestError("Sorry, can not find this account!"));
  }
  if (userId) {
    const { email, name, phone, imageUrl, role } = userData;
    return { email, name, phone, imageUrl, role };
  }
  let matchPassword = await verifyHashPassword(password, userData.password);
  if (matchPassword || (userData.role === "attendee" && req.method === "GET")) {
    return userData;
  } else {
    throw Error(
      BadRequestError("Incorrect password! check your password again.")
    );
  }
};

// Validation Checks
const checkValidation = (user) => {
  const errorList = validateUser(user);
  if (errorList.length > 0) {
    throw Error(BadRequestError(validationErrorMessage(errorList)));
  } else {
    return true;
  }
};

const handleMessage = (userByEmail, userByPhone) => {
  if (userByEmail && userByPhone) {
    return "Unable to create a user, this email & phone are already used!";
  } else if (userByEmail || userByPhone) {
    return `Unable to create a user, this ${
      userByEmail ? "email" : "phone"
    } already used!`;
  }
};
