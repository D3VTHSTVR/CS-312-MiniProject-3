// import the pool class from the pg library
const { Pool } = require('pg');

// create a new pool instance to manage database connections
const pool = new Pool({
  // postgresql username
  user: 'postgres',       
  host: 'localhost',
   // database name
  database: 'BlogDB',    
  // postgresql password 
  password: 'beans',      
  // default postgresql port
  port: 5432              
});

// export the pool so it can be used in other files
module.exports = pool; 