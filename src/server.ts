import app from './app';
import { env } from './config/env';
import { sequelize } from './db/sequelize';

async function start() {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(env.port, () => {
      // eslint-disable-next-line no-console
      console.log(`Server listening on port ${env.port}`);
    });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Startup error:', err);
    process.exit(1);
  }
}

start();
