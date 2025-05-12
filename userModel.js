import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  Role: {
    type: String,
    default: "user",
  },
  verifiedMentor: {
    type: Boolean,
    default: false
  },
  name: {
    type: String
  }
});

export const userModel = mongoose.model("userModel", userSchema);
