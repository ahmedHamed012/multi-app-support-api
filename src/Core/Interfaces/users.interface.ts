import { Document } from 'mongoose';
import { UserRoles } from 'src/Shared/Enums/user.roles.enum';

export interface IUSER extends Document {
  readonly firstName: string;
  readonly lastName: string;
  readonly phoneNumber: string;
  readonly dob?: Date;
  readonly email: string;
  readonly password: string;
  readonly image?: string;
  readonly userRole?: UserRoles;
  readonly passwordResetToken?: string;
  readonly resetTokenExpirationDate?: Date;
  readonly createdAt?: Date;
}
