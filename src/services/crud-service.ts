// import { eq, getTableName } from 'drizzle-orm';
// import { fromPromise, ok, ResultAsync } from 'neverthrow';
// import { SQLiteTable } from 'drizzle-orm/sqlite-core';
// import { ERROR_MESSAGE } from '@/common/constants';
// import { InternalServerError } from '@/exception/exception';
// import { db } from '@/providers/db-config';
// import { safeDbFetch } from '@/utils/safe-db-fetch';
//
// export interface BaseSchema {
//   id: number;
// }
//
// export class CrudService<T extends BaseSchema> {
//   private tableName: string;
//   constructor(
//     private readonly schema: SQLiteTable,
//     private readonly entityName: string
//   ) {
//     this.tableName = getTableName(schema);
//   }
//
//   /**
//    * Lists all entities
//    * @returns {ResultAsync<T[], InternalServerError>} A Result containing an array of entities or an error
//    */
//   list = (): ResultAsync<T[], InternalServerError> => {
//     const promise = db.query[this.tableName].findMany();
//     const result = fromPromise(promise, () => {
//       return new InternalServerError({
//         message: ERROR_MESSAGE.serverError,
//         details: {
//           target: this.entityName,
//           operation: 'list',
//           layer: 'db',
//         },
//       });
//     });
//     return result;
//   };
//
//   /**
//    * Retrieves an entity by its ID
//    * @param {number} id - The ID of the entity to retrieve
//    * @returns {ResultAsync<T, Error>} A Result containing the entity or an error
//    */
//   getById = (id: number): ResultAsync<T, Error> => {
//     const query = db.query[this.schema.name].findFirst({
//       where: eq(this.schema.id, id),
//     });
//
//     const result = safeDbFetch(query, this.entityName);
//     return result;
//   };
//
//   /**
//    * Creates a new entity
//    * @param {Object} payload - The entity data
//    * @returns {ResultAsync<T[], Error>} A Result containing the created entity or an error
//    */
//   create = (payload: Partial<T>): ResultAsync<T[], Error> => {
//     const query = fromPromise(
//       db.insert(this.schema).values(payload).returning(),
//       () => {
//         return new InternalServerError({
//           message: ERROR_MESSAGE.serverError,
//           details: {
//             target: this.entityName,
//             operation: 'create',
//             layer: 'db',
//           },
//         });
//       }
//     );
//     return query;
//   };
//
//   /**
//    * Updates an entity by its ID
//    * @param {number} id - The ID of the entity to update
//    * @param {Object} payload - The entity data to update
//    * @returns {ResultAsync<T[], Error>} A Result containing the update result or an error
//    */
//   update = (id: number, payload: Partial<T>): ResultAsync<T[], Error> => {
//     const query = safeDbFetch(
//       db.query[this.schema.name].findFirst({ where: eq(this.schema.id, id) }),
//       this.entityName
//     ).andThen(() => {
//       return fromPromise(
//         db
//           .update(this.schema)
//           .set(payload)
//           .where(eq(this.schema.id, id))
//           .returning(),
//         () => {
//           return new InternalServerError({
//             message: ERROR_MESSAGE.serverError,
//             details: {
//               target: this.entityName,
//               operation: 'update',
//               layer: 'db',
//             },
//           });
//         }
//       );
//     });
//     return query;
//   };
//
//   /**
//    * Deletes an entity by its ID
//    * @param {number} id - The ID of the entity to delete
//    * @returns {ResultAsync<number, Error>} A Result containing the status code or an error
//    */
//   delete = (id: number): ResultAsync<number, InternalServerError> => {
//     const internalServerError = new InternalServerError({
//       message: ERROR_MESSAGE.serverError,
//       details: {
//         target: this.entityName,
//         operation: 'delete',
//         layer: 'db',
//       },
//     });
//
//     return fromPromise(
//       db.query[this.schema.name].findFirst({ where: eq(this.schema.id, id) }),
//       () => internalServerError
//     ).andThen((record) => {
//       if (!record) {
//         return ok(404); // Gone: Entity not found
//       }
//
//       return fromPromise(
//         db.delete(this.schema).where(eq(this.schema.id, id)),
//         () => internalServerError
//       ).map(() => 204); // No Content: Entity successfully deleted
//     });
//   };
// }
