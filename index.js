const express = require('express')
const bodyparser = require('body-parser')
//const admin = require('./firebase-config')
var admin = require("firebase-admin");

var serviceAccount = require("../firebase-nodejs-master/fir-inappmessaging.json");


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
})
const app = express()
app.use(bodyparser.json())

const port = 5000

const notification_options = {
    priority: "high",
    timeToLive: 60 * 60 * 24
  };


app.post('/firebase/notification', (req, res)=>{
    const  registrationToken = req.body.registrationToken
    const message1 = req.body.message
    const options =  notification_options
    console.log('registrationToken----'+registrationToken);
    console.log('message1----'+message1);
    console.log('options----'+options);
    const message2 = {
     
      "message":{
        "token":"​d3A4q57ES4ukw7VbPgvkbu",
        "notification":{
          "title":"Portugal vs. Denmark",
          "body":"great match!"
        }
      }
    }

    const message = {
      data: {
        score: '850',
        time: '2:45'
      },
      token: '​d3A4q57ES4ukw7VbPgvkbu'
    };
    console.log('message-----------',message);
    
    admin.messaging().send(message)
      .then( response => {

       res.status(200).send("Notification sent successfully"+response)
        
      })
      .catch( error => {
          console.log(error);
      });

})

app.listen(port, () =>{
console.log("listening to port "+port)
})


