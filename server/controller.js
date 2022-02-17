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
    const { userName, firstName, lastName, email, password } = req.body;
    const checkUser = await sequelize.query(
      `SELECT * FROM users WHERE username = '${userName}'`
    );
    if (checkUser[1].rowCount !== 0) {
      res.status(500).send("Username already Exists");
    } else {
      const salt = bcrypt.genSaltSync(10);
      const passwordHash = bcrypt.hashSync(password, salt);
      const newUser = await sequelize.query(
        `INSERT INTO users(username, firstname, lastname, email, password)
      VALUES(
      '${userName}',
       '${firstName}',
        '${lastName}',
         '${email}',
          '${passwordHash}')
        RETURNING id, firstname, lastname`
      );
      // console.log(newUser);
      res.status(200).send(newUser[0][0]);
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
  getGames: async (req, res) => {
    const { input } = req.body;
    //my Sub-optimal.
    const games = await sequelize.query(
      `SELECT * FROM game
      WHERE state IN (SELECT state FROM game WHERE state = '${input}')
      OR city IN (SELECT city FROM game WHERE city = '${input}')
      OR zipcode IN (SELECT zipcode FROM game WHERE zipcode::char = '${input}')`
    );
    res.status(200).send(games[0]);
  },
  createGame: async (req, res) => {
    const { venue, state, city, address, zipcode } = req.body;
    const createGame = await sequelize.query(
      `INSERT INTO game(venue, state, city, address, zipcode)
      VALUES(
        '${venue}',
        '${state}',
        '${city}',
        '${address}',
        '${zipcode}'
      ) RETURNING id`
    );
    res.status(200).send(createGame[0][0]);
  },
};
