require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const PORT = process.env.PORT || 4000;

const app = express();

const {
  createUser,
  userLogin,
  searchGames,
  createGame,
  getGame,
  joinGame,
  getPlayers,
  removePlayer,
  setPlayerStatus,
  getUsersGame,
} = require("./controller.js");

app.use(express.json());
app.use(cors());

// Comet Chat
const appID = "{}";
const apiKey = "{}";
const url = "'https://api.cometchat.com/v2'";

const headers = {
  "Content-Type": "application/json",
  appid: appID,
  apikey: apiKey,
};

//Endpoints
app.post("/register", createUser);
app.post("/login", userLogin);
app.post("/SearchGames", searchGames);
app.post("/create", createGame);
app.post("/getPlayers", getPlayers);
app.post("/userGame", getUsersGame);
app.put("/joinGame/:id", joinGame);
app.put("/setPlayerStatus", setPlayerStatus);
app.get("/game/:id", getGame);
app.delete("/removePlayer", removePlayer);

app.listen(PORT, () => {
  console.log(`Warped to ${PORT}`);
});
