require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const PORT = process.env.PORT || 4000;

const app = express();

const {
  createUser,
  userLogin,
  getGames,
  createGame,
  getGame,
  joinGame,
  getPlayers,
} = require("./controller.js");

app.use(express.json());
app.use(cors());

//Endpoints
app.post("/register", createUser);
app.post("/login", userLogin);
app.post("/games", getGames);
app.post("/create", createGame);
app.post("/getPlayers", getPlayers);
app.get("/game/:id", getGame);
app.put("/joinGame/:id", joinGame);

app.listen(PORT, () => {
  console.log(`Warped to ${PORT}`);
});
