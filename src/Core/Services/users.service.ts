import { Inject, Injectable, Req, Res } from '@nestjs/common';
import { Model } from 'mongoose';
import { IUSER } from '../Interfaces/users.interface';
import { ResponseUtil } from 'src/Utils/response.util';
import { Request, Response } from 'express';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USERS_MODEL')
    private usersModel: Model<IUSER>,
  ) {}

  async findAll(@Req() req: Request, @Res() res: Response): Promise<any> {
    const allUsers = await this.usersModel.find().exec();
    if (allUsers.length === 0) {
      return ResponseUtil(res,"No users found", 404, allUsers);
    }
    return ResponseUtil(res, "All users", 200, allUsers);
  }
}
