// import the pool class from the pg library
const { Pool } = require('pg');

// create a new pool instance to manage database connections
const pool = new Pool({
  user: 'postgres',       // Your PostgreSQL username
  host: 'localhost',
  database: 'BlogDB',     // Your database name
  password: 'beans',      // Your PostgreSQL password (fix the missing quote)
  port: 5432              // Default PostgreSQL port
});

// export the pool so it can be used in other files
module.exports = pool; 