import { ERROR_MESSAGE } from '../common/constants';
import { account } from '../db/schema';
import { InternalServerError } from '../exception/exception';
import { db } from '../providers/db-config';
import { eq } from 'drizzle-orm';
import { fromPromise } from 'neverthrow';
import { safeDbFetch } from '../utils/safe-db-fetch';

export class AccountService {
  getById = (id: number) => {
    const query = db.query.account.findFirst({
      where: eq(account.id, id),
    });

    const result = safeDbFetch(query, 'account');
    return result;
  };

  list = () => {
    const promise = db.query.account.findMany();
    const result = fromPromise(promise, () => {
      return new InternalServerError({
        message: ERROR_MESSAGE.serverError,
        details: {
          target: 'account',
          operation: 'list',
          layer: 'db',
        },
      });
    });
    return result;
  };

  create = (payload: { name: string }) => {
    const query = fromPromise(
      db.insert(account).values(payload).returning(),
      () => {
        return new InternalServerError({
          message: ERROR_MESSAGE.serverError,
          details: {
            target: 'account',
            operation: 'create',
            layer: 'db',
          },
        });
      }
    );
    return query;
  };

  update = (id: number, payload: { name: string }) => {
    const query = fromPromise(
      db.update(account).set(payload).where(eq(account.id, id)).returning(),
      () => {
        return new InternalServerError({
          message: ERROR_MESSAGE.serverError,
          details: {
            target: 'account',
            operation: 'update',
            layer: 'db',
          },
        });
      }
    );
    return query;
  };

  delete = (id: number) => {
    const query = fromPromise(
      db.delete(account).where(eq(account.id, id)),
      () => {
        return new InternalServerError({
          message: ERROR_MESSAGE.serverError,
          details: {
            target: 'account',
            operation: 'delete',
            layer: 'db',
          },
        });
      }
    );
    return query;
  };
}

export const accountService = new AccountService();
