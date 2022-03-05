require("dotenv").config();
const { CONNECTION_STRING } = process.env;
const Sequelize = require("sequelize");
const bcrypt = require("bcrypt");
// const res = require("express/lib/response");
// const { user } = require("pg/lib/defaults");

const sequelize = new Sequelize(CONNECTION_STRING, {
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
});

module.exports = {
  // User Signup
  createUser: async (req, res) => {
    const { userName, firstName, lastName, email, password } = req.body;
    const checkUser = await sequelize.query(
      `SELECT * FROM users WHERE username = '${userName}'`
    );
    if (checkUser[1].rowCount !== 0) {
      res.status(500).send("Email already Exists");
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
      res.status(200).send(newUser[0][0]);
    }
  },
  // User Login
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

  // Users Search for Games
  searchGames: async (req, res) => {
    const { input } = req.body;
    //my Sub-optimal query
    const games = await sequelize.query(
      `SELECT * FROM games
      WHERE state IN (SELECT state FROM games WHERE state = '${input}')
      OR city IN (SELECT city FROM games WHERE city = '${input}')
      OR zipcode IN (SELECT zipcode FROM games WHERE zipcode::char = '${input}')`
    );
    res.status(200).send(games[0]);
  },

  // Create new Game
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
        '${skill}',
        '${userid}'
      ) RETURNING id`
    );
    res.status(200).send(createGame[0][0]);
  },

  // Get game from gameId
  getGame: async (req, res) => {
    const { id } = req.params;
    const game = await sequelize.query(
      `SELECT * FROM games WHERE id = '${id}'`
    );
    res.status(200).send(game[0][0]);
  },

  // Grabs the game the user created
  getUsersGame: async (req, res) => {
    const { userId } = req.body;
    console.log(userId);
    const response = await sequelize.query(
      `SELECT * FROM games WHERE userid = '${userId}'`
    );
    res.status(200).send(response[0][0]);
  },

  // Users Join specific game
  joinGame: async (req, res) => {
    const { id } = req.params;
    const { userId } = req.query;
    const response = await sequelize.query(`INSERT INTO players(userid, gameid)
    VALUES('${userId}', ${id})`);
    res.status(200).send(response[0][0]);
  },

  // Get all players from specific game id
  getPlayers: async (req, res) => {
    const { gameId } = req.body;
    const response = await sequelize.query(
      `SELECT * FROM users LEFT OUTER JOIN players ON users.id = players.userid WHERE players.gameid = '${gameId}'
      `
    );
    res.status(200).send(response[0]);
  },

  // Remove a player from a game
  removePlayer: async (req, res) => {
    const { userId } = req.query;
    console.log(userId);
    const response = await sequelize.query(
      `DELETE FROM players WHERE userid = '${userId}'`
    );
    res.status(200).send(response[0][0]);
  },

  // Set Player Status for game
  setPlayerStatus: async (req, res) => {
    const { userId, value } = req.body;
    const response = await sequelize.query(
      `UPDATE users SET status = '${value}' WHERE id = '${userId}'
      RETURNING status`
    );
    res.status(200).send(response[0]);
  },

  // Deletes user created game
  deleteGame: async (req, res) => {
    const { gameId } = req.params;
    const response = await sequelize.query(
      `DELETE FROM games WHERE id = '${gameId}'`
    );

    res.status(200).send(response[0][0]);
  },

  // Update user created game
  updateGame: async (req, res) => {
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
      gameId,
    } = req.body;
    const updateGame = await sequelize.query(
      `UPDATE games
      SET
      venue = '${venue}',
      state = '${state}',
      city = '${city}',
      address = '${address}',
      zipcode = '${zipcode}',
      agegroup = '${age}',
      duration = '${duration}',
      skill = '${skill}',
      userid = '${userid}'

      WHERE '${gameId}' = id
    `
    );
    res.status(200).send(updateGame[0][0]);
  },
};
