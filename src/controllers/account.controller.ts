import { NextFunction, Request, Response } from 'express';
import { accountService } from '@/services/account.service';
import { paramExtractor, safeZodParse } from '@/utils/validation/validator';
import {
  createAccountSchema,
  updateAccountSchema,
} from '@/utils/validation/validation-schema';
import { BadRequestError } from '@/exception/exception';
import { err, ok } from 'neverthrow';

export const getById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const result = accountService.getById(+req.params.id);
  result.match(
    (account) => {
      res.json(account);
    },
    (err) => {
      next(err);
    }
  );
};

export const list = (_req: Request, res: Response, next: NextFunction) => {
  const result = accountService.list();
  result.match(
    (accounts) => {
      res.json(accounts);
    },
    (err) => {
      next(err);
    }
  );
};

export const create = (req: Request, res: Response, next: NextFunction) => {
  const parser = safeZodParse(createAccountSchema);
  const payload = parser(req.body);
  if (payload.isErr()) {
    const badRequestException = new BadRequestError({
      message: 'Invalid Request body',
      details: { ...payload.error },
    });
    next(badRequestException);
  } else {
    const result = accountService.create(payload.value);

    result.match(
      (account) => {
        res.status(201).json(account);
      },
      (err) => {
        next(err);
      }
    );
  }
};

export const update = (req: Request, res: Response, next: NextFunction) => {
  const payload = paramExtractor(req, 'id').andThen((payload) => {
    const parser = safeZodParse(updateAccountSchema);
    const payloadBody = parser(req.body);
    if (payloadBody.isOk()) {
      return ok({ id: payload, account: payloadBody.value });
    } else {
      return err(payloadBody.error);
    }
  });
  if (payload.isErr()) {
    next(
      new BadRequestError({
        message: 'Invalid Request body',
        details: { ...payload.error },
      })
    );
    return;
  }

  const result = accountService.update(payload.value.id, payload.value.account);
  result.match(
    (account) => {
      res.json(account);
    },
    (err) => {
      next(err);
    }
  );
};

export const deleteAccount = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const payload = paramExtractor(req, 'id');
  if (payload.isErr()) {
    next(
      new BadRequestError({
        message: 'Invalid Request body',
        details: { ...payload.error },
      })
    );
    return;
  }

  const result = accountService.delete(payload.value);
  result.match(
    (status) => {
      res.status(status).send();
    },
    (err) => {
      next(err);
    }
  );
};
