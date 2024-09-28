import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from 'src/Core/Services/auth.service';
import { UsersService } from 'src/Core/Services/users.service';

@Controller('auth')
export class AuthenticationController {
  constructor(
    private readonly userService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @Post('login')
  async login(
    @Body() loginBody: { email: string; password: string },
    @Req() req: Request,
    @Res() res: Response,
  ) {
    return this.authService.signIn(
      req,
      res,
      loginBody.email,
      loginBody.password,
    );
  }
}
