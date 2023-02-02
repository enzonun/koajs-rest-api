require('dotenv').config();

module.exports = {

  "development": {
    "username": "postgres",
    "password": "postgres",
    "database": "sampledb",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "TEST": {
    "username": process.env.TEST_DB_USERNAME,
    "password": process.env.TEST_DB_PASSWORD,
    "database": process.env.TEST_DB_NAME,
    "host": process.env.TEST_DB_HOST,
    "dialect": "postgres"
  },
  "production": {
    "username": process.env.PROD_DB_USERNAME,
    "password": process.env.PROD_DB_PASSWORD,
    "database": process.env.PROD_DB_NAME,
    "host": process.env.PROD_DB_HOST,
    "dialect": "postgres"
  }

}