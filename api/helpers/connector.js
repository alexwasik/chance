const knex = require('knex')({
  client: 'pg',
  connection: {
    host: 'localhost',
    user: 'user',
    password: 'password',
    database: 'zylo_chance',
    port: 54321
  },
  pool: { min: 2, max: 10 },
  migrations: { tableName: 'knex_migrations' }
});
const logger = require('../../api/helpers/logger');
const fs = require('fs');

async function connector(file) {
  console.log('made it', file);
  try {
    const data = fs.readFileSync(file);
    console.log('data', data);
    // await knex('charge').insert(data);
    process.exit(0);
  } catch (e) {
    logger.info('Error Importing Data', e);
    process.exit(1);
  }
};

connector();
