const express = require('express')
const bodyparser = require('body-parser')
var admin = require("firebase-admin");

//Add service account json from firebase settings
var serviceAccount = require("../firebase-nodejs-master/fir-inappmessaging.json");

//Initialize the service account to firebase admin
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
})

//initialise express.js
const app = express()
app.use(bodyparser.json())

//Server Port
const port = 3000

//To be worked 
const notification_options = {
    priority: "high",
    timeToLive: 60 * 60 * 24
  };

//Post To req to firebase
app.post('/firebase/sendnNotification', (req, res)=>{
    const  registrationToken = req.body.registrationToken
    const title = req.body.title
    const message =  req.body.message
    //Notification body
    const notificationBody = {
      data: {
        title: title,
        message: message
      },
      token: registrationToken
    };
    console.log('message-----------',notificationBody);
    //send notification body to firebase
    admin.messaging().send(notificationBody)
      .then( response => {
       res.status(200).send("Notification sent successfully"+response)
      })
      .catch( error => {
          console.log(error);
      });

})

//Server Listen
app.listen(port, () =>{
console.log("listening to port "+port)
})


