var express = require('express');
var jsoncsv = require('express-json-csv')(express);
var router = express.Router();
var path = require('path');

var async = require('async');
var Student = require(path.join(__dirname, '..', 'models', 'student'));
var util = require(path.join(__dirname, '..', 'utilities', 'util'))
var OD = require(path.join(__dirname, '..', 'models', 'od'));

router.use(util.allowedUsers(['DSW']));


router.route('/')
.get(function(req, res, next){
  res.render('dsw');
})

router.route('/export')
.get(function(req, res, next)
{
    OD.find({ approved: true, date: { '$gte': req.query.startDate, '$lte': req.query.endDate } }).populate('student').then(function(ods)
    {
        async.map(ods, function (e, next)
        {
            next(null,
            {
                date: new Date(e.date.getTime() + 19800000).toLocaleDateString("en-gb"),
                studentName: e.student.name,
                studentId: e.student._id,
                duration: e.duration
            })

        }, function (error, results)
        {
            if (error)
            {
                return next(error);
            }
            return res.csv(results, { fields: ['studentId', 'date', 'studentName', 'duration']});
        });

    })
})




module.exports = router;
