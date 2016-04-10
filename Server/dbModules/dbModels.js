var dbConnection = require('./dbConnection');

var dbUser = dbConnection.userDB;

var counterSchema = require('./../schema/counter');
var counterModel = dbUser.model('counter', counterSchema, 'counter');

var userSchema = require('./../schema/user');
var userModel = dbUser.model('user', userSchema, 'user');

var priceCurveSchema = require('./../schema/priceCurve');
var priceCurveModel = dbUser.model('priceCurve', priceCurveSchema, 'priceCurve');

var priceCurveCorrelationSchema = require('./../schema/priceCurveCorrelation');
var priceCurveCorrelationModel = dbUser.model('priceCurveCorrelation', priceCurveCorrelationSchema, 'priceCurveCorrelation');

var priceCurveParamsSchema = require('./../schema/priceCurveParams');
var priceCurvParamsModel = dbUser.model('priceCurveParams', priceCurveParamsSchema, 'priceCurveParams');

var maturityPriceCurveDatasetSchema = require('./../schema/maturityPriceCurveDataset');
var maturityPriceCurveDatasetModel = dbUser.model('maturityPriceCurveDataset', maturityPriceCurveDatasetSchema, 'maturityPriceCurveDataset');

var limSymbolsSchema = require('./../schema/limSymbols');
var limSymbolsModel = dbUser.model('limSymbols', limSymbolsSchema, 'limSymbols');

var jobSchema = require('./../schema/job');
var jobModel = dbUser.model('job', jobSchema, 'job');

var jobConfigSchema = require('./../schema/jobConfig');
var jobConfigModel = dbUser.model('jobConfig', jobConfigSchema, 'jobConfig');

var portfolioSchema = require('./../schema/portfolio');
var portfolioModel = dbUser.model('portfolio', portfolioSchema, 'portfolio');


var dbModels = {
    counter: counterModel,
    user: userModel,

    priceCurveModel: priceCurveModel,
    priceCurveCorrelationModel: priceCurveCorrelationModel,
    priceCurvParamsModel: priceCurvParamsModel,
    maturityPriceCurveDatasetModel: maturityPriceCurveDatasetModel,
    limSymbolsModel: limSymbolsModel,
    jobModel: jobModel,
    jobConfigModel: jobConfigModel,
    portfolioModel: portfolioModel
};

module.exports = dbModels;