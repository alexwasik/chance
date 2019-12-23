const knex = require('knex');
const { defaultConnection } = require('../config/config');
const logger = require('../api/helpers/logger');

const wait = async (times = 0) => {
  if (times > 40) {
    logger.error('Could not connect to postgress. Please make sure database is running');
    process.exit(500);
  }
  try {
    const db = knex(defaultConnection);
    await db.raw('SELECT 999 AS RESULT');
    logger.info('Successfully connected to the database!');
    await db.raw('CREATE TABLE charge(amount integer, date timestamp, name varchar(255), description varchar(255), type varchar(255))');
    logger.info('Successfully created charge');
    process.exit(0);
  } catch (e) {
    setTimeout(this, 500, times + 1);
  }
};

wait();
