import { MikroORM } from "@mikro-orm/core";
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { Deposit } from "./db/entities/DepositModel.js";

import { dbConfig } from "./config/serverConfig.js";


const mikroOrmConfig = {
    entities: [Deposit],
    dbName: dbConfig.database,
    type: 'postgresql',
    user: dbConfig.user,
    password: dbConfig.password,
    host: dbConfig.host,
    port: dbConfig.port,
    debug: true,
} as Parameters<typeof MikroORM.init>[0];

export default mikroOrmConfig;