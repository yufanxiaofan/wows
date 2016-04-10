var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var maturityPriceCurveDatasetSchema = new Schema({
    createdBy: {type: String, required: true},
    createdTime: {type: Date, default: Date.now},
    maturityDate: {type: Date},
    deliveryDate: {type: Date},
    observationDate: {type: Date, required: true},
    priceValue: {type: Number},
});

module.exports = maturityPriceCurveDatasetSchema;