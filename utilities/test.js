var moment = require('moment');
var momentTimezone = require('moment-timezone');

var today = moment().startOf('day').format();
var startTime = moment(today).add(8,'hours');
startTime = momentTimezone(startTime, '', 'Asia/Kolkata').format();
console.log(startTime);
