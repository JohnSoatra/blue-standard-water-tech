const firebase = require("firebase-admin");
const serviceAccount = require("./blue-standard-firebase-adminsdk-cu29b-4c86603890.json");
firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount)
});
module.exports = firebase