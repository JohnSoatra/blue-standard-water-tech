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
  if (path === "") {
    response.end(JSON.stringify({msg: "no name"}));
    return;
  }
  const file = buck.file(path);
  await file.get()
    .then(res => 
      res[0].download()
      .then(buffer =>
        response.end(buffer[0]), 
        err => response.end(JSON.stringify({msg: "cannot download", content: err}))
      )
      .catch(err =>
        response.end(JSON.stringify({msg: "error in download", content: err}))
      ),
      err => response.end(JSON.stringify({msg: "cannot get", content: err}))
    )
    .catch(err => 
      response.end(JSON.stringify({msg: "error in get", content: err}))
    );
});

app.listen(port, () => console.log("App is running!"));