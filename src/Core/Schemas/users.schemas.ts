import * as mongoose from 'mongoose';
import { UserRoles } from 'src/Shared/Enums/user.roles.enum';

export const UsersSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  phoneNumber: String,
  dob: Date,
  email: String,
  password: String,
  image: String,
  userRole: String,
  passwordResetToken: String,
  resetTokenExpirationDate: Date,
  createdAt: Date,
});
