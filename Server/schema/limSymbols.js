
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var limSymbolsSchema = new Schema({
    limSymbol: {type: String},
    limColumn: {type: String},
    partnerLimSymbol: {type: String},
    partnerLimColumn: {type: String },
    commodity: {type: String },
    location: {type: String},
    flow: {type: String},
    businessName: {type: String},
    adhocLimSymbol: {type: String},
    excludeCalibration: {type: String},
    instrumentType: {type: String},
    priceCurveId: {type: Schema.ObjectId},
    usZone: {type: String},
    queryContracts: {type: String},
    scheduling: {type: String},
    country: {type: String},
    volumeUnit: {type: String},
    autoComplete: {type: String},
    contractCategory: {type: String},
    atcExclusion: {type: String},
    minPriceBound: {type: Number},
    maxPriceBound: {type: Number},
    spotIndicator: {type: String}
});

module.exports = limSymbolsSchema;