const express = require("express");
const cors = require("cors");
const firebase = require("./fb_config/fb_admin");
const app = express();
const storage = firebase.storage();
const buck = storage.bucket("gs://blue-standard.appspot.com");
const port = process.env.port || 8080;

app.use(cors());
app.get("/*", async (request, response) => {
  const path = request.path.replace("/", "");
  const file = buck.file(path);
  const data = await file.get()
    .then(res => res[0].download()
      .then(buffer => buffer[0], err => JSON.stringify({msg: "error", content: err}),
      err => JSON.stringify({msg: "error", content: err}))
      .catch(err => JSON.stringify({msg: "error", content: err}))
    .catch(err => JSON.stringify({msg: "error", content: err})));
  response.end(data);
});

app.listen(port, () => console.log("App is running!"));