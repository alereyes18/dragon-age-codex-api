/** @format */
import { Kysely, PostgresDialect } from "kysely";
import pg from "pg";
import dotenv from "dotenv";
dotenv.config();
const { Pool } = pg;
const dialect = new PostgresDialect({
    pool: new Pool({
        // log: (msg:string) => console.log(msg),
        connectionString: process.env.DATABASE_URL,
        max: 10,
    }),
});
export const kysely = new Kysely({ dialect, log: ["query", "error"] });
/*
To generate types:
    npm i prisma-kysely@1.0.8
    npx prisma db pull
    npx prisma generate

*/
//# sourceMappingURL=database.js.map