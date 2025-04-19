import { ResultAsync, err, ok } from 'neverthrow';
import { InternalServerError, NotFoundError } from '../exception/exception';
import { SQLiteRelationalQuery } from 'drizzle-orm/sqlite-core/query-builders/query';
import { ERROR_MESSAGE } from '../common/constants';

export const safeDbFetch = <TType extends 'sync' | 'async', TResult>(
  query: SQLiteRelationalQuery<TType, TResult>,
  target: string
) => {
  return ResultAsync.fromPromise(query, () => {
    return new InternalServerError({
      message: ERROR_MESSAGE.serverError,
      details: {
        target: target,
        layer: 'db',
      },
    });
  }).andThen((result) => {
    // Read from db was success but return was undefined
    if (!result) {
      return err(
        new NotFoundError({
          message: `Target ${target} not found`,
          details: {
            target: target,
            operation: 'get',
            layer: 'db',
          },
        })
      );
    }
    return ok(result);
  });
};
