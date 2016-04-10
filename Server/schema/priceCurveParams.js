var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var priceCurveParamsSchema = new Schema({
    priceCurveId: {type: Schema.ObjectId},
    stochasticProcess: {type: Number},
    mu: {type: Number, default: 0},
    speed: {type: Number},
    ltv: {type: Number},
    sigmaMax: {type: Number, default: 0.3},
    sigmaMin: {type: Number, default: 0.1},
    alpha: {type: Number, default: 0.9102},
    sigmaLt: {type: Number, default: 0},
    createdBy: {type: String},
    createdTime: {type: Date, default: Date.now},
    jobId: {type: Schema.ObjectId},
    minPriceBound: {type: Number, default: 0},
    maxPriceBound: {type: Number, default: 1000000000}
});

module.exports = priceCurveParamsSchema;