var mongoose = require('mongoose');
var Promise = require('bluebird');

var OD = new mongoose.Schema({
    student : { type: String, ref: 'Student', required: true }, // student
    userId : { type: String, ref: 'User', required: true },
    date : { type: Date, required: true },
    duration: { type: String, enum: ['firstHalf', 'secondHalf', 'fullDay'] },
    approved: { type: Boolean, required: true, default: false }
}, {
    timestamps: true
});

module.exports = mongoose.model('OD', OD);
