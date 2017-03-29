module.exports = function (app, mongo, autoIncrement) {
  
  // Create review
  app.post('/review', function (req, res, next) {
    // Validation for required or rating not from 0 to 10 inclusive 
    if (!req.body.userID || !req.body.storeID || req.body.rating < 0 || req.body.rating > 10) 
      return res.sendStatus(403); // Forbidden

    // If user does not exist
    mongo.getDB().collection('users').find({
      _id: parseInt(req.body.userID)
    }).toArray(function(err, docs){
      if (docs.length == 0)
        return res.sendStatus(403);
      next();
    });
  });
  // If store does not exist
  app.post('/review', function (req, res, next) {
    mongo.getDB().collection('stores').find({
      _id: req.body.storeID
    }).toArray(function(err, docs){
      if (docs.length == 0)
        return res.sendStatus(403);
      next();
    });
  });

  app.post('/review', function (req, res) {
    // Query database: first, check if review (of userID and storeID) already exists
    mongo.getDB().collection('reviews').count({
      userID: req.body.userID, storeID: req.body.storeID
    }, function(err, count) {
      // Review already exists 
      if (count > 0) 
        return res.sendStatus(403);
      // Else, Insert into database
      autoIncrement.getNextSequence(mongo.getDB(), 'reviews', function (err, autoIndex) {
        mongo.getDB().collection('reviews').insertOne({
          _id: autoIndex.toString(),
          userID: req.body.userID,
          storeID: req.body.storeID,
          rating: req.body.rating,
          comment: req.body.comment
        }, function(err, review) {
          return res.sendStatus(200); // OK
        });
      });
    });
  });

  // Get reviews by reviewID, userID, or storeID
  app.get('/review', function (req, res) {
    var query = {};
    (req.query.id == '' || req.query.id) ? (query._id = req.query.id) : "";
    (req.query.userid == '' || req.query.userid) ? (query.userID = req.query.userid) : "";
    (req.query.storeid == '' || req.query.storeid) ? (query.storeID = req.query.storeid) : "";
    mongo.getDB().collection('reviews').find(query).sort({
      rating:+1, _id:+1}).toArray(function(err, reviews) {
      if (query._id != null) {
        if (reviews.length == 0)
          return res.sendStatus(404); // review not found
      }
      res.json({
        reviews: reviews
      });
    });
  });

  // Delete review by reviewID, userID or storeID 
  app.delete('/review', function (req, res) {
    var query = {};
    (req.query.id == '' || req.query.id) ? (query._id = req.query.id) : "";
    (req.query.storeid == '' || req.query.storeid) ? (query.storeID = req.query.storeid) : "";
    (req.query.userid == '' || req.query.userid) ? (query.userID = req.query.userid) : "";
    if (query._id != null) {
      mongo.getDB().collection('reviews').deleteOne({
        _id: query._id
      }, function(err, result) {
        if (result.deletedCount == 1) {
          return res.sendStatus(200);
        } else {
          return res.sendStatus(404); // no review with this id
        }
      });
    } else if (query.storeID != null) {
      mongo.getDB().collection('reviews').deleteMany({
        storeID: query.storeID
      }, function(err, result) {
        if (result.deletedCount == 0) {
          return res.sendStatus(404); // storeID does not exist
        } else {
          return res.sendStatus(200);
        }
      });
    } else if (query.userID != null){
      mongo.getDB().collection('reviews').deleteMany({
        userID: query.userID
      }, function(err, result) {
        if (result.deletedCount == 0) {
          return res.sendStatus(404); // userID does not exist
        } else {
          return res.sendStatus(200);
        }
      });
    }
  });

  // Update an existing review
  app.put('/review', function (req, res) {
    var valid_rating = false;
    var query = {};
    (req.query.id == '' || req.query.id) ? (query._id = req.query.id) : "";
    // Set update JSON
    var updateJSON = {};
    //check if rating is valid
    if (req.body.rating >= 0 && req.body.rating <= 10){
      updateJSON.rating = req.body.rating;
      valid_rating = true;
    }
    if (req.body.comment && req.body.comment != '')
      updateJSON.comment = req.body.comment;
    // Update
    mongo.getDB().collection('reviews').updateOne({
      _id: query._id
    }, {
      $set: updateJSON
    }, function(err, review) {
      if (valid_rating) {
        if (review.matchedCount == 1) {
          return res.sendStatus(200);
        } else {
          return res.sendStatus(404); //review doesnt exist
        }
      } else {
        return res.sendStatus(400); //rating wasn't form 0-10 inclusive
      }  
    });
  });

}
