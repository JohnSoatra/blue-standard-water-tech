const express = require("express");
const cors = require("cors");
const firebase = require("./fb_admin");
const app = express();
const port = process.env.port || 5000;

app.use(cors());

app.get("/*", (req, res) => {
  res.send({msg: "Home page"});
});

app.listen(port, () => console.log("App is running!"));