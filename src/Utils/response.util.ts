import { Response } from 'express';

export const ResponseUtil = (
  res: Response,
  message = '',
  statusCode = 500,
  data: any = {},
) => {
  const statusMessage =
    `${statusCode}`.startsWith('4') || `${statusCode}`.startsWith('5')
      ? 'fail'
      : 'success';

  res.status(statusCode).json({
    status: statusMessage,
    length: Array.isArray(data) ? data.length : undefined,
    message,
    data,
  });
};
