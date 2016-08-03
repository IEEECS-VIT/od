var mongoose = require('mongoose');
var Promise = require('bluebird');

var Student = new mongoose.Schema({
    _id: { type: String, required: true }, // username
    name : { type: String, required: true }
});

module.exports = mongoose.model('Student', Student);
