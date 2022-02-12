require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const { SERVER_PORT } = process.env;

const { createUser } = require("./controller");

app.use(express.json());
app.use(cors());

app.post("/api/users", createUser);

app.listen(SERVER_PORT, () => console.log(`warped to ${SERVER_PORT}`));
