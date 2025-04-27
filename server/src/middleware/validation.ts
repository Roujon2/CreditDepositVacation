import { z } from 'zod';
import AppError from '../errors/AppError';
import { NextFunction, Request, Response } from 'express';

export const validateBody = (schema: z.ZodSchema) => {
    return (req: Request, res: Response, next: NextFunction): void => {
        try {
            // Validate the request body against the schema
            schema.parse(req.body);
            next(); // Proceed to the next middleware or route handler
        } catch (error) {
            // Handle validation errors from zod
            if (error instanceof z.ZodError) {
                const errors = error.errors.map(err => err.message).join(', ');
                throw new AppError(400, 'Invalid request data', errors);
            }

            next(error); // Pass other errors to the error handler
        }
    };
}

