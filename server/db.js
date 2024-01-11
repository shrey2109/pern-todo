const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  password: "postgres",
  host: "localhost",
  port: process.env.POSTGRES_DB_PORT,
  database: "perntodo",
});

module.exports = pool;
