var mongoose = require('mongoose');
var Promise = require('bluebird');

var Student = new mongoose.Schema({
    _id: String, // username
    name : { type: String, required: true }
});

module.exports = mongoose.model('Student', Student);
