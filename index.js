const express = require("express");
const cors = require("cors");
const firebase = require("./fb_config/fb_admin");
const app = express();
const storage = firebase.storage();
const buck = storage.bucket("gs://blue-standard.appspot.com");
const port = process.env.port || 8080;

app.use(cors());
app.get("/*", async (req, response) => {
  const path = request.path.replace("/", "");
  await buck.file(path).get().then(success =>
    success[0].download().then(data =>
      response.end(data[0])
    , err => response.json({msg: "error", content: err}))
  , err =>
    response.json({msg: "error", content: err})
  );
});

app.listen(port, () => console.log("App is running!"));