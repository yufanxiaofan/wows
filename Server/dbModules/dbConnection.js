var mongoose = require('mongoose');
var env = require('./../config/env').config();

var userDB = 'mongodb://' + env.db.userDBUrl;

var dbUser = mongoose.createConnection(userDB);

dbUser.on('error', console.error.bind(console, 'connection error:'));
dbUser.once('open', function (callback) {
    console.log("user db open!");
});

var counterSchema = require('./../schema/counter');
var counterModel = dbUser.model('counter', counterSchema, 'counter');

var dbConnections = {
    userDB : dbUser,
    counterModel: counterModel,
};

module.exports = dbConnections;