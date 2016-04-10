
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var jobConfigSchema = new Schema({
    settingType: {type: String},
    jobType: {type: Number},
    resultConfigId: {type: Schema.ObjectId},
    numSimulation: {type: Number},
    createdBy: {type: String, required: true},
    createdTime: {type: Date, required: true},
    timeStep: {type: Number},
    numGenerateRandomThread: {type: Number, defalut: 0},
    observationStartDate: {type: Date},
    observationEndDate: {type: Date},
    createdBy: {type: String, required: true},
    createdTime: {type: Date, required: true},
    jobConfigName: {type: String},
    isActiveJobConfig: {type: Number, default: 1}
});

module.exports = jobConfigSchema;