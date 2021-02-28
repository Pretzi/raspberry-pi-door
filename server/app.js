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
  console.log(req.body, 'Payload')

  database.ref("door").set({ status: doorStatus }, (err) => {
    if (err) {
      console.log("Failed with err: " + error);
    } else {
      console.log("Success");
    }
  });

  res.send('[Door] Update Successful');
});
