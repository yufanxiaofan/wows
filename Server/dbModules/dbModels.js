var dbConnection = require('./dbConnection');

var dbUser = dbConnection.userDB;

var counterSchema = require('./../schema/counter');
var counterModel = dbUser.model('counter', counterSchema, 'counter');

var userSchema = require('./../schema/user');
var userModel = dbUser.model('user', userSchema, 'user');


var dbModels = {
    counter: counterModel,
    user: userModel
};

module.exports = dbModels;