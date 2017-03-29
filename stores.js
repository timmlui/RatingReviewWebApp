module.exports = function (app, mongo, autoIncrement) {
  
  // Create store
  app.post('/store', function (req, res) {
    // Validation
    if (!req.body.storename || req.body.storename == '') 
      return res.sendStatus(403); // Forbidden
    // Query database: first, check if storename already exists
    mongo.getDB().collection('stores').count({
      storename: req.body.storename
    }, function(err, count) {
      /*if (count > 0) 
        // Storename already exists
        return res.sendStatus(403);*/
      // Insert into database
      autoIncrement.getNextSequence(mongo.getDB(), 'stores', function (err, autoIndex) {
        mongo.getDB().collection('stores').insertOne({
          _id: autoIndex.toString(),
          storename: req.body.storename,
          category: req.body.category || "",
          address: req.body.address || ""
        }, function(err, store) {
          return res.sendStatus(200); // OK
        });
      });
    });
  });

  // Get ordered and filtered stores by query
  app.get('/stores', function (req, res) {
    var query = {};
    (req.query.storename == '' || req.query.storename) ? (query.storename = req.query.storename) :"";
    (req.query.category == '' || req.query.category) ? (query.category = req.query.category) : "";
    mongo.getDB().collection('stores').find(query).sort({
      storename:+1, _id:+1}).toArray(function (err, stores) {
      /*if (stores.length == 0){
        return res.sendStatus(403);
      }*/
      res.json({
        stores: stores
      });
    });
  });

  // Get store by a specific ID
  app.get('/store', function (req, res) {
    var query = {};
    (req.query.id == '' || req.query.id) ? (query._id = req.query.id) : "";
    mongo.getDB().collection('stores').find(query).toArray(function(err, store) {
      if (store.length == 0)
        return res.sendStatus(404); // store not found
      res.json({
        store: store
      });
    });
  });

  // Delete store by a specific ID and their reviews
  app.delete('/store',function (req, res) {
    var query = {};
    (req.query.id == '' || req.query.id) ? (query._id = req.query.id) : "";
    mongo.getDB().collection('stores').deleteOne({
      _id: query._id
    }, function(err, result) {
      if (result.deletedCount == 1) {
        // delete all reviews of store
        mongo.getDB().collection('reviews').deleteMany({
          storeID: query._id
        });
        return res.sendStatus(200);
      } else {
        return res.sendStatus(404); //store not found
      }
    });
  });

  // Update an existing store
  app.put('/store', function (req, res) {
    var query = {};
    (req.query.id == '' || req.query.id) ? (query._id = req.query.id) : "";
    // Set update JSON
    var updateJSON = {};
    if (req.body.storename && req.body.storename != '')
      updateJSON.storename = req.body.storename;
    if (req.body.category && req.body.category != '')
      updateJSON.category = req.body.category;
    if (req.body.address && req.body.address != '')
      updateJSON.address = req.body.address;
    // Update
    mongo.getDB().collection('stores').updateOne({
      _id: query._id
    }, {
      $set: updateJSON
    }, function(err, store) {
      if (store.matchedCount == 1) {
        return res.sendStatus(200);
      } else {
        return res.sendStatus(404); //store not found
      }
    });
  });

}
