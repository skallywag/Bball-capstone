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
  deleteGame,
  updateGame,
} = require("./controller.js");

app.use(express.json());
app.use(cors());

// app.use(express.static(path.resolve(__dirname, "../build")));
//Endpoints
app.post("/register", createUser);
app.post("/login", userLogin);
app.post("/searchGames", searchGames);
app.post("/create", createGame);
app.post("/getPlayers", getPlayers);
app.post("/userGame", getUsersGame);
app.put("/joinGame/:id", joinGame);
app.put("/updateGame/", updateGame);
app.put("/setPlayerStatus", setPlayerStatus);
app.get("/game/:id", getGame);
app.delete("/removePlayer", removePlayer);
app.delete("/deleteGame/:gameId", deleteGame);

// app.get("/*", function (req, res) {
//   res.sendFile(path.join(__dirname, "../build", "index.html"));
// });

app.listen(PORT, () => {
  console.log(`Warped to ${PORT}`);
});
