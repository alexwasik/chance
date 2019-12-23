const knex = require('knex');
const { defaultConnection } = require('../config/config');
const fs = require('fs');

const fileInsert = async (file) => {
  function readFile() {
    return new Promise((resolve, reject) => {
      fs.readFile(file, (err, context) => {
        if (err) return reject(err);
        return resolve(context);
      });
    });
  }
  try {
    const db = knex(defaultConnection);
    const value = await db.insert(readFile(file)).returning('name').into('charge')
      .then(name => console.log(name));
    return value;
  } catch (error) {
    return { error: error };
  }
};

module.exports = fileInsert;
