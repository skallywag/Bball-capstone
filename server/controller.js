require("dotenv").config();
const { CONNECTION_STRING } = process.env;
const Sequelize = require("sequelize");
const bcrypt = require("bcrypt");
const res = require("express/lib/response");

const sequelize = new Sequelize(CONNECTION_STRING, {
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
});

module.exports = {
  createUser: async (req, res) => {
    // console.log(req.body);
    const { userName, firstName, lastName, email, password, rePassword } =
      req.body;
    const checkUser = await sequelize.query(
      `SELECT * FROM users WHERE username = '${userName}'`
    );
    if (checkUser[1].rowCount !== 0) {
      res.status(500).send("Username already Exists");
    } else {
      const salt = bcrypt.genSaltSync(10);
      const passwordHash = bcrypt.hashSync(password, salt);
      await sequelize.query(
        `INSERT INTO users(username, firstname, lastname, email, password)
      VALUES(
      '${userName}',
       '${firstName}',
        '${lastName}',
         '${email}',
          '${passwordHash}')`
      );
      const userInfo = await sequelize.query(
        `SELECT id, username, firstname FROM users WHERE username = '${userName}'`
      );
      res.status(200).send(userInfo);
    }
  },
  userLogin: async (req, res) => {
    const { loginEmail, loginPass } = req.body;
    const validateUser = await sequelize.query(`
    SELECT * FROM users WHERE '${loginEmail}' = email`);
    if (validateUser[1].rowCount === 1) {
      if (bcrypt.compareSync(loginPass, validateUser[0][0].password)) {
        let userInfo = {
          id: validateUser[0][0].id,
          userName: validateUser[0][0].username,
          firstName: validateUser[0][0].firstname,
          lastName: validateUser[0][0].lastname,
          email: validateUser[0][0].email,
        };
        res.status(200).send(userInfo);
      } else {
        res.status(401).send("Password is incorrect");
      }
    } else {
      res.status(401).send("Email is incorrect");
    }
  },
};
