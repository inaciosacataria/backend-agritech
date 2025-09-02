import { Sequelize } from 'sequelize';
import { env } from '../config/env';

export const sequelize = env.db.dialect === 'sqlite'
  ? new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      define: { timestamps: false },
    })
  : new Sequelize(env.db.name, env.db.user, env.db.password, {
      host: env.db.host,
      port: env.db.port,
      dialect: 'postgres',
      logging: false,
      define: { timestamps: false },
      dialectOptions: env.db.ssl
        ? { ssl: { require: true, rejectUnauthorized: false } }
        : {},
    });
