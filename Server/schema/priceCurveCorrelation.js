
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var priceCurveCorrelationSchema = new Schema({
    priceCurveId: {type: Schema.ObjectId},
    partnerPriceCurveId: {type: Schema.ObjectId},
    correlationValue: {type: Number, default: 0.9},
    createdBy: {type: String},
    createdTime: {type: Date},
    batchCreatedTime: {type: Date},
    jobId: {type: Schema.ObjectId}
});

module.exports = priceCurveCorrelationSchema;