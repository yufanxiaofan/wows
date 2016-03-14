var mongoose = require('mongoose');
var env = require('./../config/env').config();

var userdb = 'mongodb://' + env.db.adminDBUrl;

var dbUser = mongoose.createConnection(userdb);

db_admin.on('error', console.error.bind(console, 'connection error:'));
db_admin.once('open', function (callback) {
    console.log("user db open!");
});

var counterSchema = require('./../schema/counter');
var counterModel = db_admin.model('counter', counterSchema, 'counter');

var dbConnections = {
    userdb : dbUser,
    counterModel: counterModel
};

module.exports = dbConnections;