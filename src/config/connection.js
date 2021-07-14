const { Pool } = require("pg");
const config = require("./index");

const connectionString = config.DATABASE_CONNECTION;
//const connectionString = 'postgresql://roll:password@localhost:5432/dreamjob'
const pool = new Pool({
  connectionString,
});

pool
  .connect()
  .then(() => console.log("connected to database"))
  .catch((err) => console.error(err));

module.exports = pool;