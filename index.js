const express = require("express");
const cors = require("cors");
const { default: axios } = require("axios");
const path = require("path");
const app = express();
const port = process.env.port || 8080;

app.use(cors());

app.get("/", (req, res) => {
  res.send({msg: "Home page"});
});

app.get("/**", (req, res) => {
  res.send({msg: "Not found"});
});
// app.get("/:appName/**", (req, res) => {
//   let url = req.url;
//   let appName = req.params.appName;
//   if (url === `/${appName}/`) { 
//     url = `/${appName}/index.html`;
//   }
//   res.sendFile(path.join(__dirname, url));
// });

// app.get("/:appName", async (req, res) => {
//     const fullUrl = `https://${req.hostname}${req.url}/index.html`;
//     axios.get(fullUrl).then(
//       value => {
//         res.send(value.data);
//       }, reason => {
//         res.send(reason);
//     });
// })


app.listen(port, () => console.log("App is running!"));