/*
 * This contains the unique set of price curves
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var priceCurveSchema = new Schema({
    code: { type: String, required: true},
    createdBy: { type: String, required: true},
    createdTime: {type: Date, default: Date.now},
    location: { type: String },
    flowCode: { type: String },
    LOC_CDTY_ID: {type: String},
    limColumn: {type: String},
    excludeCalibration: {type: String},
    spotIndicator: {type: String, default: 0}
});

module.exports = priceCurveSchema;