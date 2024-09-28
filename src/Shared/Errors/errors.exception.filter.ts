import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Res,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class ErrorExceptionsFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    // Set default values
    const statusCode =
      exception.getStatus() || HttpStatus.INTERNAL_SERVER_ERROR;
    const status = exception.getResponse() || 'error';

    if (process.env.NODE_ENV === 'development') {
      this.sendErrorDev(exception, response);
    } else if (process.env.NODE_ENV === 'production') {
      this.sendErrorProd(exception, response);
    }
  }

  private sendErrorProd(err: any, @Res() res: Response) {
    // If it's an operational error, send the error message
    if (err.isOperational) {
      res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
      });
    } else {
      // Log the error
      console.error('ERROR 💥', err);

      // Send a generic error message
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        status: 'error',
        message: 'Something went wrong',
      });
    }
  }

  private sendErrorDev(err: any, @Res() res: Response) {
    // In development, return the error details
    console.log(err);
    res.status(err.status).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack,
    });
  }
}
