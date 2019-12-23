#!/usr/bin/env node

const program = require('commander');
const fs = require('fs');
const { Pool } = require('pg');
// const fileInsert = require('./fileInsert');
const logger = require('../api/helpers/logger');
const format = require('pg-format');

const pool = new Pool({
  user: process.env.POSTGRES_USER || 'user',
  host: process.env.POSTGRES_HOST || 'localhost',
  password: process.env.POSTGRES_PASSWORD || 'password',
  database: process.env.POSTGRES_DB || 'zylo_chance',
  port: 54321
});

const parseImportFile = (fileName) => {
  let chargeFile;
  if (!fileName) {
    program
      .option('-f, --filename <required>', 'filename required')
      .version('1.1.0')
      .parse(process.argv);
    chargeFile = program.filename;
  } else {
    chargeFile = fileName;
  }

  if (!chargeFile) {
    logger.error('filename required');
    process.exit(1);
  }

  try {
    const rawData = fs.readFileSync(chargeFile);
    return JSON.parse(rawData);
  } catch (error) {
    logger.info(error);
    return null;
  }
};

process.on('uncaughtException', (err) => {
  logger.error('Unexpected Error', err);
  process.exit(1);
});

const formatQueryData = (dataArray) => {
  const formattedData = dataArray.map((charge) => {
    const updatedCharge = charge;
    return Object.values(updatedCharge);
  });
  return formattedData;
};

const execute = () => {
  const data = parseImportFile();
  const queryData = formatQueryData(data);
  const query = format('INSERT INTO charge(amount,date,name,description,type) VALUES %L', queryData);

  pool.query(query)
    .then((response) => {
      logger.info(response);
      process.exit(0);
    })
    .catch((err) => {
      logger.error('Unexpected Error', err);
      process.exit(1);
    });
};

execute();
