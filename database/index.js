const { Pool } = require('pg');
const config = require('./config.js');
const pool = new Pool({
    host: config.host,
    user: config.user,
    database: config.database,
    password: config.password,
    port: config.port,
  });

 pool.connect()
  .then(res => {
      console.log('Connected to Database');
  })
  .catch(err => {
      console.error(err)
  });

  module.exports = pool;

