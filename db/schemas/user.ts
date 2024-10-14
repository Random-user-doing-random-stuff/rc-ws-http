import { ObjectId } from "mongodb";
interface User {
  _id: ObjectId; // Unique identifier for each user
  username: string; // The user's chosen username
  email: string; // The user's email address
  passwordHash: string; // A hashed version of the user's password
  createdAt: Date; // Timestamp of account creation
  lastActiveAt: Date; // Optional: When the user was last active
}

export default User;