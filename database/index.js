const { Pool } = require('pg');
const pool = new Pool({
    host: 'localhost',
    user: 'benpintel',
    database: 'products_db',
    passqord: '',
    port: 5432,
  });

  pool.query('SELECT NOW()', (err, result) => {
    if (err) {
      console.error('Error executing query', err)
    } else {
    console.log('Connected to DB')
    } 
  })

  module.exports = pool;