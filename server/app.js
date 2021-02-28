const express = require("express");
const firebase = require('firebase');
const firebaseConfig = require("./firebase-config")
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const app = express();

firebase.initializeApp(firebaseConfig);
let database = firebase.database();

app.listen(port, function () {
  console.log(`App listening on port ${port}`);
});

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.post('/door', function (req, res) {
  const doorStatus = req.body.status;
  console.log("Door Status:", doorStatus, states[doorStatus]);

  const states = {
    open: "abierta",
    close: "cerrada"
  }

  database.ref("door").set({ status: states[doorStatus] }, (err) => {
    if (err) {
      console.log("Failed with err: " + error);
    } else {
      console.log("Success");
    }
  });

  res.send('[Door] Update Successful');
});

app.get('/door', function (req, res) {
  database.ref('door').once('value')
  .then(function(snapshot) {
      const { status } = snapshot.val();
      console.log("Door Status:", status);
      res.send(status);
  })
});