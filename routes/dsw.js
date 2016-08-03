var express = require('express');
var jsoncsv = require('express-json-csv')(express);
var router = express.Router();
var path = require('path');
var Student = require(path.join(__dirname, '..', 'models', 'student'));
var util = require(path.join(__dirname, '..', 'utilities', 'util'))
var OD = require(path.join(__dirname, '..', 'models', 'od'));

router.use(util.allowedUsers(['DSW']));


router.route('/export')
.get(function(req, res, next)
{
    OD.find({ approved: true }).then(function(ods)
    {
        return res.csv(ods, { fields: ['student', 'userId', 'date', 'startTime', 'endTime']});
    })
})




module.exports = router;

