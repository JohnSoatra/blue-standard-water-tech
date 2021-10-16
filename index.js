const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.port || 5000;
const firebase = require("./fb_admin");
const storage = firebase.storage();
const buck = storage.bucket("gs://blue-standard.appspot.com");
app.use(cors());
app.get("/*", async (request, response) => {
  // const path = request.path.replace("/", "");
  // await buck.file(path).get().then(success =>
  //   success[0].download().then(data =>
  //     response.end(data[0])
  //   , err => response.json({msg: "error", content: err}))
  // , err =>
  //   response.json({msg: "error", content: err})
  // );
  response.send("Hello");
});

app.listen(port, () => console.log("App is running!"));