var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    //primary key
    name: {type: String, unique: true, required: true, dropDups: true, index: true},
    //email address
    email: String,
    //admin password
    password: String,
    //salt key for password encryption
    salt: String
});

module.exports = userSchema;