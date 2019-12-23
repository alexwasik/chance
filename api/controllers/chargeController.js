'use strict';

const chargeService = require('../services/chargeService');
const knex = require('knex');
const { defaultConnection } = require('../../config/config');
/**
 * Swagger Controller method for GET /charges/build Endpoint
 */
const index = async (req, res) => {
  try {
    const db = knex(defaultConnection);
    const values = await db.select().from('charge')
      .then(console.log('success'));
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
  res.status(400).json({ code: 400, message: 'Count param must be integer' });
};

module.exports = {
  build: build,
  index: index
};
