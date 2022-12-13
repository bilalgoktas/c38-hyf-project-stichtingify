import mongoose from "mongoose";
import validateAllowedFields from "../util/validateAllowedFields.js";

const { Schema } = mongoose;
const userSchema = new Schema({
  name: { type: String, required: true }, //regex validation needed. only latin alphabet allowed. (no number, no special characters)
  imageUrl: String,
  role: { type: String, enum: ["attendee", "organizer"], required: true },
  email: { type: String, required: true }, //regex validation needed. e.g.: example@example.com
  password: { type: String },
  phone: { type: String }, //regex validation needed. e.g.: 0698765432
  eventIds: [Schema.Types.ObjectId],
});

const User = mongoose.model("user", userSchema);

export const validateUser = (userObject) => {
  const errorList = [];
  const allowedKeys = [
    "name",
    "email",
    "imageUrl",
    "role",
    "phone",
    "eventIds",
    "password",
  ];

  const validatedKeysMessage = validateAllowedFields(userObject, allowedKeys);
  if (validatedKeysMessage.length > 0) {
    errorList.push(validatedKeysMessage);
  }
  if (userObject.name == null) {
    errorList.push("Name is a required field");
  }
  if (userObject.password == null && userObject.role === "organizer") {
    errorList.push("Password is a required field");
  }
  if (userObject.role == null) {
    errorList.push("Role is a required field");
  }

  return errorList;
};

export default User;
