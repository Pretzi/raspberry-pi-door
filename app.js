var express = require("express");
var port = process.env.PORT || 3000;
var bodyParser = require('body-parser');
var app = express();

app.listen(port, function () {
  console.log(`Example app listening on port !`);
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.post('/logs', function (req, res) {
  console.log(req.body, 'LOGS PAYLOAD')
  res.send('[POST] Logs');
});