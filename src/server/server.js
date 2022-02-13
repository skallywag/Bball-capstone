const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 4000;
// const { sequelize } = require("./sequelize");
app.use(express.json());
app.use(cors());

//Endpoints
app.post("/register");
// sequelize.authenticate();

app.listen(PORT, () => {
  console.log(`Warped to ${PORT}`);
});
