import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    age: { type: String, required: true },
  },
  { timestamps: true }
);

const User = mongoose.model("Users", UserSchema);

export default User;
