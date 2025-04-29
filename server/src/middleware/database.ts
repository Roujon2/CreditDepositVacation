// Middleware used to pass a database session to the request

import { NextFunction, Request, Response } from 'express';
import AppError from '../errors/AppError';
import { getORM } from 'db/mikro-orm';


export const withDbSession = (req: Request, res: Response, next: NextFunction): void => {
    const orm = getORM();
    if (!orm) {
        throw new AppError(500, 'Database not initialized');
    }

    req.em = orm.em.fork(); // Fork a new EntityManager for the request

    // Clear the EntityManager after the response is sent
    res.on('finish', () => {
        req.em.clear();
    }
    );

    // Call the next middleware or route handler
    next();
}
