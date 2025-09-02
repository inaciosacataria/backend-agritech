import { NextFunction, Request, Response } from 'express';
import { ZodSchema } from 'zod';

export function validateBody<T>(schema: ZodSchema<T>) {
  return (req: Request, res: Response, next: NextFunction) => {
    const parse = schema.safeParse(req.body);
    if (!parse.success) {
      return res.status(400).json({ error: 'Validation error', details: parse.error.flatten() });
    }
    // Attach parsed data for type safety
    // @ts-expect-error attach parsed data
    req.validatedBody = parse.data;
    next();
  };
}
