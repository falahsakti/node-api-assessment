require("dotenv").config();

const { DB_USER, DB_HOST, DB_PASSWORD, DB_DATABASE, DB_DIALECT, DB_PORT } =
  process.env;

const config = {
  username: DB_USER,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  host: DB_HOST,
  dialect: DB_DIALECT,
  port: DB_PORT,
};

module.exports = config;
