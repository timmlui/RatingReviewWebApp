var mongoose = require('mongoose');

// Doc for Mongoose Schemas:
var Schema = mongoose.Schema;

/** data loaded from a json file */

var userSchema = new Schema(
	{
		_id: {
			type: Number
		},
		username: {
			type: String, required: true, unique: true
		},
		firstname: {
			type: String, default: ""
		},
		lastname: {
			type: String, default: ""
		},
		sex: {
			type: String, default: ""
		},
		age: {
			type: Number, default: 0
		},
		rating:{
			type: Number
		},
		ratingCount:{
			type: Number
		},
	},
		{
			collection: "users"
		}
	);

var storeSchema = new Schema(
	{
		_id: {
			type: String		
		},
		storename: {
			type: String, required: true
		},
		category: {
			type: String, default: ""
		},
		address: {
			type: String, default: ""
		},
	},
	{
		collection: 'stores'
	}
);

var reviewSchema = new Schema(
	{
		_id: {
			type: String		
		},
		userID: {
			type: String, required: true
		},
		storeID: {
			type: String, required: true
		},
		rating: {
			type: Number, required: true
		},
		comment: {
			type: String
		},
	},
	{
		collection: 'reviews'
	}
);

mongoose.connect('mongodb://localhost/shemadb');

module.exports = mongoose.model('reviews',reviewSchema);
module.exports = mongoose.model('stores',storeSchema);
module.exports = mongoose.model('users',userSchema);