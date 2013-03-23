var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/music_review_catalog");

//schema define
var userSchema = mongoose.Schema({
	username: String,
	password: String,
	email:String,
	role:String
})

// gaibuni sarasu
var User = mongoose.model("User",userSchema);
module.exports.User = User;