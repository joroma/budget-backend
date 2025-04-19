import { ResultAsync, fromPromise } from 'neverthrow';
import {
  CategoryGroup,
  UpdateCategoryGroup,
  categoryGroup,
} from '@/db/schemas/category-group';
import { InternalServerError } from '../exception/exception';
import { db } from '@/providers/db-config';
import { ERROR_MESSAGE } from '../common/constants';
import { eq } from 'drizzle-orm';
import { safeDbFetch } from '../utils/safe-db-fetch';

export class CategoryGroupService {
  /**
   * List all category group
   * @returns {ResultAsync<CategoryGroup[], InternalServerError>} A Result containing array of
   * category group or error
   */
  list = (): ResultAsync<CategoryGroup[], InternalServerError> => {
    const promise = db.query.categoryGroup.findMany();
    const result = fromPromise(promise, () => {
      return new InternalServerError({
        message: ERROR_MESSAGE.serverError,
        details: {
          target: 'category-group',
          operation: 'list',
          layer: 'db',
        },
      });
    });

    return result;
  };

  /**
   * Retrives a category group by id
   * @param {number} id - The id ofr the category group
   * @returns {ResultAsync<CategoryGroup, Error>} A ResultAsync
   * object containing a category group or error
   *
   */
  getById = (id: number): ResultAsync<CategoryGroup, Error> => {
    const query = db.query.categoryGroup.findFirst({
      where: eq(categoryGroup.id, id),
    });
    const result = safeDbFetch(query, 'Category Group');
    return result;
  };
  /**
   * Creates a new category group
   * @param {Object} payload - The category group data
   * @param {string} payload.name - The name of the category group
   * @returns {ResultAsync<CategoryGroup, Error>} A Result containing the created category group or an error
   */

  create = (payload: { name: string }): ResultAsync<CategoryGroup[], Error> => {
    const promise = fromPromise(
      db.insert(categoryGroup).values(payload).returning(),
      () => {
        return new InternalServerError({
          message: ERROR_MESSAGE.serverError,
          details: {
            target: 'category-group',
            operation: 'create',
            layer: 'db',
          },
        });
      }
    );
    return promise;
  };

  /**
   * Deletes a category group by id
   * @param {number} id - The id of the category group to delete
   * @returns {ResultAsync<CategoryGroup, Error>} A Result containing the deleted category group or an error
   */
  delete = (id: number): ResultAsync<CategoryGroup[], Error> => {
    const promise = fromPromise(
      db.delete(categoryGroup).where(eq(categoryGroup.id, id)).returning(),
      () => {
        return new InternalServerError({
          message: ERROR_MESSAGE.serverError,
          details: {
            target: 'category-group',
            operation: 'delete',
            layer: 'db',
          },
        });
      }
    );
    return promise;
  };

  update = (id: number, payload: UpdateCategoryGroup) => {
    const promise = fromPromise(
      db
        .update(categoryGroup)
        .set(payload)
        .where(eq(categoryGroup.id, id))
        .returning(),
      () => {
        return new InternalServerError({
          message: ERROR_MESSAGE.serverError,
          details: {
            target: 'category-group',
            operation: 'delete',
            layer: 'db',
          },
        });
      }
    );
    return promise;
  };
}

export const categoryGroupService = new CategoryGroupService();
