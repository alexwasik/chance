#!/usr/bin/env node

const program = require('commander');
const connector = require('../api/helpers/connector');

program
  .option('-f, --filename <required>', 'filename required')
  .version('1.1.0')
  .parse(process.argv);

const logger = require('../api/helpers/logger');

process.on('uncaughtException', (err) => {
  logger.error('Unexpected Error', err);
  process.exit(1);
});

// TODO import file to database
// const chargeFile = program.filename;
connector();

process.exit(0);
