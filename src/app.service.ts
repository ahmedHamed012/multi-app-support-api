import { Injectable, Res } from '@nestjs/common';
import { AppError } from './Shared/Errors/app.error';
import { ResponseUtil } from './Utils/response.util';
import { Response } from 'express';

@Injectable()
export class AppService {
  getHello(flag: string, @Res() res: Response): any {
    if (flag === 'no') {
      throw new AppError('You can not access this route', 403);
      // return ResponseUtil(res, 'You cant access this part!', 403);
    }
    return ResponseUtil(res, 'Hello World!', 200);
  }
}
