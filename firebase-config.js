var admin = require("firebase-admin");

var serviceAccount = require("../firebase-nodejs-master/fir-inappmessaging.json");


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
})

module.exports.admin = admin.messaging()