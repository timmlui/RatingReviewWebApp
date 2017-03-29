module.exports = function (app, mongo, autoIncrement) {
  
  // Create user
  app.post('/user', function (req, res) {
    // Validation
    if (!req.body.username) 
      return res.sendStatus(403); // Forbidden
    // Query database: first, check if username already exists
    mongo.getDB().collection('users').count({
      username: req.body.username
    }, function(err, count) {
      if (count > 0) 
        // Username already exists
        return res.sendStatus(403);
      // Insert into database
      autoIncrement.getNextSequence(mongo.getDB(), 'users', function (err, autoIndex) {
        mongo.getDB().collection('users').insertOne({
          _id: autoIndex,
          username: req.body.username,
          firstname: req.body.firstname || "",
          lastname: req.body.lastname || "",
          sex: req.body.sex || "",
          age: req.body.age || 0
        }, function(err, user) {
          return res.sendStatus(200); // OK
        });
      });
    });
  });

  // Get all users ordered by username ascending or filtered by given query
  app.get('/users', function (req, res) {
    var query = {};
    (req.query.firstname == '' || req.query.firstname) ? (query.firstname = req.query.firstname) :"";
    (req.query.lastname == '' || req.query.lastname) ? (query.lastname = req.query.lastname) : "";
    (req.query.sex == '' || req.query.sex) ? (query.sex = req.query.sex) : "";
    (req.query.age) ? (query.age = parseInt(req.query.age)) : "";
    mongo.getDB().collection('users').find(query).sort({
      username:+1}).toArray(function (err, users) {
      /*if (users.length == 0)
        return res.sendStatus(404); // users not found*/
      res.json({
        users: users
      });
    });
  });

  // Get user by a specific ID or by username
  app.get('/user', function (req, res) {
    var query = {};
    (req.query.id) ? (query._id = parseInt(req.query.id)) : "";
    (req.query.username == '' || req.query.username) ? (query.username = req.query.username) : "";
    mongo.getDB().collection('users').find(query).toArray(function (err, user) {
      if (user.length == 0) //|| Object.keys(req.query).length == 0
        return res.sendStatus(404); // user not found
      res.json({
        user: user
      });
    });
  });

  // Delete user by a specific ID and their reviews 
  app.delete('/user',function (req, res) {
    var query = {};
    (req.query.id) ? (query._id = parseInt(req.query.id)) : "";
    mongo.getDB().collection('users').deleteOne({
      _id: query._id
    }, function(err, result) {
      if (result.deletedCount == 1) {
        // delete all of user's reviews
        mongo.getDB().collection('reviews').deleteMany({
          userID: req.query.id
        });
        return res.sendStatus(200);
      } else {
        return res.sendStatus(404); //user not found
      }
    });
  });

  // Update an existing user
  app.put('/user', function (req, res) {
    var query = {};
    (req.query.id) ? (query._id = parseInt(req.query.id)) : "";
    // Set update JSON
    var updateJSON = {};
    if (req.body.firstname && req.body.firstname != '')
      updateJSON.firstname = req.body.firstname;
    if (req.body.lastname && req.body.lastname != '')
      updateJSON.lastname = req.body.lastname;
    if (req.body.sex && req.body.sex != '')
      updateJSON.sex = req.body.sex;
    if (req.body.age && !isNaN(req.body.age))
      updateJSON.age = req.body.age;
    // Update
    mongo.getDB().collection('users').updateOne({
      _id: query._id
    }, {
      $set: updateJSON
    }, function(err, user) {
      if (user.matchedCount == 1) {
        return res.sendStatus(200);
      } else {
        return res.sendStatus(404); //user not found
      }
    });
  });

}
