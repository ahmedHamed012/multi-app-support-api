import { Controller, Get, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { UsersService } from 'src/Core/Services/users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}
  @Get()
  getUsers(@Req() req: Request, @Res() res: Response) {
    return this.userService.findAll(req, res);
  }
}
