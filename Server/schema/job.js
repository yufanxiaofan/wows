
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var jobSchema = new Schema({
    portfolioId: { type: Schema.ObjectId, required: true},
    jobConfigId: { type: Schema.ObjectId, required: true},
    dataReferenceDate: {type: Date, default: Date.now},
    status: { type: String },
    submitRequestTime: { type: Date },
    receiveReplyTime: {type: Date},
    remark: {type: String},
    createdBy: {type: String, required: true},
    createdTime: {type: Date, required: true}
});

module.exports = jobSchema;