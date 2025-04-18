import { NextFunction, Request, Response } from 'express';
import { STATUS_CODES } from '../common/constants';
import { CustomError } from '../exception/exception';

const errorHandler = (
  err: unknown,
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof CustomError) {
    res.status(err.status).json(err);
    return;
  }
  const status = STATUS_CODES.internalServerError;
  const message = messageExtractor(err);
  res.status(status).json({ status, message });
  next(err);
};

function messageExtractor(err: unknown): string {
  if (err instanceof Error) {
    return err.message;
  }

  if (err && typeof err === 'object' && 'message' in err) {
    return err.message as string;
  }

  if (typeof err === 'string') {
    return err;
  }
  return 'An error has occurred';
}

export default errorHandler;
