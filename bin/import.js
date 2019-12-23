#!/usr/bin/env node

const program = require('commander');
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
const fs = require('fs');
// const parse = require('./parse');

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
const chargeFile = program.filename;
const rawData = fs.readFileSync(chargeFile);
const rowData = JSON.parse(rawData);
const inserts = rowData.map(row => ({
  amount: row.amount, date: row.date, name: row.name, description: row.description, type: row.type
}));
// console.log('inserts', inserts);
knex('charge').insert({ name: 'me', amount: 0 })
  .then(response => console.log('response', response));
// knex('charge').raw(`INSERT INTO charge(amount, date, name, description, type) VALUES (500, '2019-12-18T19:37:36+00:00', 'testing', 'testing', 'ap');`)
//   .then((result) => {
//     console.log('result', result);
//   });
// console.log('knex', knex('charge'));

// console.log('data', data[0]);
// knex('charge').insert(data[0]);

// parse(chargeFile);
// console.log('parse', parse);
process.exit(0);
