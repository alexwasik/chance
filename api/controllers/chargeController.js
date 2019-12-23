'use strict';

const chargeService = require('../services/chargeService');
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
/**
 * Swagger Controller method for GET /charges/build Endpoint
 */
const index = async (req, res) => {
  try {
    const values = await knex.select().from('charge');
    res.status(200).json(values);
  } catch (error) {
    res.status(500).json(error);
    console.log('error', error);
  }
};

const build = (req, res) => {
  const buildNum = req.params.count;
  if (!Number(buildNum).isNan) {
    chargeService.build(buildNum, (err, message) => {
      if (err) {
        return res.status(400).json({ code: 400, message: err.message }).end();
      }
      return res.status(200).json({ code: 200, message: message }).end();
    });
  }
  res.status(400).json({ code: 400, message: 'Count Param must be Integer '});
};

module.exports = {
  build: build,
  index: index
};
