import { MikroORM } from "@mikro-orm/core";
import { PostgreSqlDriver, defineConfig } from '@mikro-orm/postgresql';
import { Deposit } from "./entities/DepositModel.js";
import { Payment } from "./entities/PaymentModel.js";

import { dbConfig } from "../config/serverConfig.js";

export default defineConfig({
    entities: [Deposit, Payment],
    dbName: dbConfig.database,
    user: dbConfig.user,
    password: dbConfig.password,
    host: dbConfig.host,
    port: parseInt(dbConfig.port) || 5432,
    driverOptions: {},
    debug: true,
    migrations: {
        path: './dist/db/migrations',
        pathTs: './src/db/migrations',
    }
});