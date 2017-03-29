var express = require('express');
var app = express();

// Enable CORS for the backend
var cors = require('cors-express');
app.use(cors({}));

// MongoDB
var mongo = require('./mongo.js');
mongo.connectToServer(function(err) {
  // Database is ready; listen on port 3000
  app.listen(3000, function () {
    console.log('App listening on port 3000');
  });
});

// MongoDB auto-increment
var autoIncrement = require("mongodb-autoincrement");

// Array intersect
var intersect = require('intersect');

app.use(express.static(__dirname + '/'));

app.get('/', function (req, res){
  res.sendFile(__dirname + '/RatingApp.html');
});

// Parse JSON and make sure that it's not empty
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
app.post('*', jsonParser, function (req, res, next) {
  if (!req.body) return res.sendStatus(400);
  next();
});

// Authentication
app.all('*', jsonParser, function (req, res, next) {
  if (req.token) {
    var decodedToken = jwt.decode(req.token, secret);
    if (decodedToken && new Date(decodedToken.exp) > new Date()) {
      // Check if user exists
      mongo.getDB().collection('users').find({
        _id: decodedToken.userID
      }).toArray(function(err, docs) {
        if (docs.length > 0) {
          req._id = docs[0]._id;
          req.username = docs[0].username;
          req.firstname = docs[0].firstname;
          req.lastname = docs[0].lastname;
          req.sex = docs[0].sex;
          req.age = docs[0].age;
        }
        next();
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

// Users endpoints
require('./users.js')(app, mongo, autoIncrement);

// Stores endpoints
require('./stores.js')(app, mongo, autoIncrement);

// Reviews endpoints
require('./reviews.js')(app, mongo, autoIncrement);
