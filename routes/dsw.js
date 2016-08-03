var express = require('express');
var jsoncsv = require('express-json-csv')(express);
var router = express.Router();
var path = require('path');
var Student = require(path.join(__dirname, '..', 'models', 'student'));
var util = require(path.join(__dirname, '..', 'utilities', 'util'))
var OD = require(path.join(__dirname, '..', 'models', 'od'));

router.use(util.allowedUsers(['DSW']));


router.route('/')
.get(function(req, res, next)
{
    OD.find({ approved: true, '$gte': req.query.startDate, '$lt': req.query.endDate }).then(function(ods)
    {
        return res.csv(ods, { fields: ['student', 'userId', 'date', 'duration']});
    })
})




module.exports = router;

