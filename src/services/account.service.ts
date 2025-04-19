import { ERROR_MESSAGE } from '../common/constants';
import { account } from '@/db/schemas/index';
import { InternalServerError } from '../exception/exception';
import { db } from '../providers/db-config';
import { eq } from 'drizzle-orm';
import { ResultAsync, fromPromise, ok } from 'neverthrow';
import { safeDbFetch } from '../utils/safe-db-fetch';
import { Account } from '@/db/schemas/account';

export class AccountService {
  /**
   * Retrieves an account by its ID
   * @param {number} id - The ID of the account to retrieve
   * @returns {ResultAsync<Account, Error>} A Result containing the account or an error
   */
  getById = (id: number): ResultAsync<Account, Error> => {
    const query = db.query.account.findFirst({
      where: eq(account.id, id),
    });

    const result = safeDbFetch(query, 'account');
    return result;
  };
  /**
   * Lists all accounts
   * @returns {Result<Account[], InternalServerError>} A Result containing an array of accounts or an error
   */
  list = (): ResultAsync<Account[], InternalServerError> => {
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
  /**
   * Creates a new account
   * @param {Object} payload - The account data
   * @param {string} payload.name - The name of the account
   * @returns {ResultAsync<ResultSet, Error>} A Result containing the created account or an error
   */
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

  /**
   * Updates an account by its ID
   * @param {number} id - The ID of the account to update
   * @param {Object} payload - The account data to update
   * @param {string} payload.name - The new name of the account
   * @returns {ResultAsync<ResultSet, Error>} A Result containing the update result or an error
   */
  update = (
    id: number,
    payload: { name: string }
  ): ResultAsync<Account[], Error> => {
    const query = safeDbFetch(
      db.query.account.findFirst({ where: eq(account.id, id) }),
      'Account'
    ).andThen(() => {
      return fromPromise(
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
    });
    return query;
  };

  delete = (id: number): ResultAsync<number, InternalServerError> => {
    const internalServerError = new InternalServerError({
      message: ERROR_MESSAGE.serverError,
      details: {
        target: 'account',
        operation: 'delete',
        layer: 'db',
      },
    });
    return fromPromise(
      db.query.account.findFirst({ where: eq(account.id, id) }),
      () => internalServerError
    ).andThen((accountRecord) => {
      if (!accountRecord) {
        return ok(404); // Gone: Account not found
      }

      return fromPromise(
        db.delete(account).where(eq(account.id, id)),
        () =>
          new InternalServerError({
            message: ERROR_MESSAGE.serverError,
            details: {
              target: 'account',
              operation: 'delete',
              layer: 'db',
            },
          })
      ).map(() => 204); // No Content: Account successfully deleted
    });
  };
}

export const accountService = new AccountService();
