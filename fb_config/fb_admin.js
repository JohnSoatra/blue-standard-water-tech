const firebase = require("firebase-admin");
const serviceAccount = require("./serviceAcount.json");
firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount)
});
module.exports = firebase;