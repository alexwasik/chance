const { Client } = require('pg');

const connector = async () => {
  const client = new Client({
    host: process.env.POSTGRES_HOST,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB
  });
  client.connect();
  try {
    const res = await client.query('SELECT NOW()');
    console.log('res', res);
    await client.end();
  } catch (error) {
    console.log('error', error);
  }
};

module.exports = connector;
