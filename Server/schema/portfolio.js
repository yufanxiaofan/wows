
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var portfolioSchema = new Schema({
    name: { type: String, required: true},
    createdBy: { type: String, required: true},
    createdTime: {type: Date, default: Date.now},
    status: { type: String },
    comments: { type: String },
    resultType: {type: String}
});

module.exports = portfolioSchema;