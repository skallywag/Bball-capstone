require("dotenv").config();
const { DATABASE_STRING } = process.env;
const res = require("express/lib/response");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(DATABASE_STRING, {
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
});
