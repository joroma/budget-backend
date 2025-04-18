import { STATUS_CODES } from '../common/constants';

export class CustomError extends Error {
  status: number;
  details?: Record<string, unknown>;
  constructor({
    status,
    message,
    details,
  }: {
    status: number;
    message: string;
    details?: Record<string, unknown>;
  }) {
    super();
    this.message = message;
    this.status = status;
    this.details = details;
  }
}

export class NotFoundError extends CustomError {
  constructor({
    message,
    details,
  }: {
    message: string;
    details?: Record<string, unknown>;
  }) {
    super({
      status: STATUS_CODES.notFound,
      message,
      details,
    });
  }
}
export class InternalServerError extends CustomError {
  constructor({
    message,
    details,
  }: {
    message: string;
    details?: Record<string, unknown>;
  }) {
    super({
      status: STATUS_CODES.internalServerError,
      message,
      details,
    });
  }
}
export class BadRequestError extends CustomError {
  constructor({
    message,
    details,
  }: {
    message: string;
    details?: Record<string, unknown>;
  }) {
    super({
      status: STATUS_CODES.badRequest,
      message,
      details,
    });
  }
}
