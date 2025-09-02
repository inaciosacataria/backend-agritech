import dotenv from 'dotenv';

dotenv.config();

export const env = {
  port: process.env.PORT ? Number(process.env.PORT) : 3000,
  db: {
    dialect: (process.env.DB_DIALECT || 'postgres') as 'postgres' | 'sqlite',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 5432,
    name: process.env.DB_NAME || 'agritech',
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASS || 'postgres',
    ssl: (process.env.DB_SSL || 'false').toLowerCase() === 'true',
  },
};
