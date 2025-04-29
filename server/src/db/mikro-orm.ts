// File to initialize MikroORM and export ORM instance and helpers
import { MikroORM } from '@mikro-orm/postgresql';
import config from './mikro-orm.config';

let orm: MikroORM | null = null;

export const initORM = async () => {
    orm = await MikroORM.init(config);
    return orm;
}

export const getORM = () => {
    if (!orm) {
        throw new Error('ORM not initialized. Call initORM() first.');
    }
    return orm;
}

export const getForkedEntityManager = () => {
    return getORM().em.fork();
}

