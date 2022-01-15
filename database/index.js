const { Pool } = require('pg');
const pool = new Pool({
    host: 'localhost',
    user: 'benpintel',
    database: 'products_db',
    password: '',
    port: 5432,
  });

 pool.connect()
  .then(res => {
      console.log('Connected to Database');
  })
  .catch(err => {
      console.error(err)
  });

  module.exports = pool;

