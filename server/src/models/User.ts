import { Schema, model } from "mongoose";

const userSchema = new Schema({
  name: { type: String },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  role: {
    type: Number,
    required: true,
  },
});

export const User = model("User", userSchema);
