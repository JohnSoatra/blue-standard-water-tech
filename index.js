const express = require("express");
const cors = require("cors");
const { default: axios } = require("axios");
const path = require("path");
const app = express();
const port = process.env.port || 8080;

app.use(cors());

app.get("/*", (req, res) => {
  res.send({msg: "Home page"});
});

app.listen(port, () => console.log("App is running!"));