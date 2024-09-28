import {
  Inject,
  Injectable,
  Req,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import { IUSER } from '../Interfaces/users.interface';
import { ResponseUtil } from 'src/Utils/response.util';
import { Request, Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    @Inject('USERS_MODEL')
    private usersModel: Model<IUSER>,
  ) {}

  async signIn(
    req: Request,
    res: Response,
    username: string,
    pass: string,
  ): Promise<any> {
    const findUser = await this.usersModel.findOne({
      email: username,
      password: pass,
    });
    if (!findUser) {
      return ResponseUtil(res, 'User not found', 404, findUser);
    }
    const payload = {
      firstName: findUser.firstName,
      lastName: findUser.lastName,
      userRole: findUser.userRole,
    };
    return ResponseUtil(res, 'Logged in successfully', 200, {
      token: await this.jwtService.signAsync(payload),
    });
  }
}
