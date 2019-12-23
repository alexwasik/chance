#!/usr/bin/env node

const program = require('commander');
const fileInsert = require('./fileInsert');
const logger = require('../api/helpers/logger');

program
  .option('-f, --filename <required>', 'filename required')
  .version('1.1.0')
  .parse(process.argv);

process.on('uncaughtException', (err) => {
  logger.error('Unexpected Error', err);
  process.exit(1);
});

// TODO import file to database
const chargeFile = program.filename;

const response = fileInsert(chargeFile);
console.log('response', response);

process.exit(0);
