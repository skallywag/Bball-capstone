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
      `SELECT * FROM games
      WHERE state IN (SELECT state FROM games WHERE state = '${input}')
      OR city IN (SELECT city FROM games WHERE city = '${input}')
      OR zipcode IN (SELECT zipcode FROM games WHERE zipcode::char = '${input}')`
    );
    res.status(200).send(games[0]);
  },
  createGame: async (req, res) => {
    const {
      venue,
      state,
      city,
      address,
      zipcode,
      age,
      duration,
      skill,
      userid,
    } = req.body;
    const createGame = await sequelize.query(
      `INSERT INTO games(venue, state, city, address, zipcode, agegroup, duration, skill, userid)
      VALUES(
        '${venue}',
        '${state}',
        '${city}',
        '${address}',
        '${zipcode}',
        '${age}',
        '${duration}',
        '${skill}'
        '${userid}'
      ) RETURNING id, userid`
    );
    res.status(200).send(createGame[0][0]);
  },
  getGame: async (req, res) => {
    const { id } = req.params;
    // console.log(id);
    const game = await sequelize.query(
      `SELECT * FROM games WHERE id = '${id}'`
    );
    res.status(200).send(game[0][0]);
  },
};
