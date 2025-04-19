import { type Result, err, ok } from 'neverthrow';
import { ZodError, ZodSchema, z } from 'zod';
import { Request } from 'express';

interface ZodParseError<T> {
  type: 'validation';
  error: ZodError<T>;
}

export function safeZodParse<TSchema extends ZodSchema>(
  schema: TSchema
): (
  data: unknown
) => Result<z.infer<TSchema>, ZodParseError<z.infer<TSchema>>> {
  return (data: unknown) => {
    const result = schema.safeParse(data);
    return result.success
      ? ok(result.data)
      : err({ type: 'validation', error: result.error });
  };
}

export const paramExtractor = (req: Request, paramKey: string) => {
  const parser = safeZodParse(z.coerce.number().positive());
  return parser(req.params[paramKey]);
};
