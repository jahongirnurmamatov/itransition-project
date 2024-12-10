import { Pool } from "pg";
import dotenv from 'dotenv';	

dotenv.config();

export const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: 5432,
    idleTimeoutMillis: 300
});