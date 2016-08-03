var express = require('express');
var jsoncsv = require('express-json-csv')(express);
var router = express.Router();
var path = require('path');
var Student = require(path.join(__dirname, '..', 'models', 'student'));
var util = require(path.join(__dirname, '..', 'utilities', 'util'))
var OD = require(path.join(__dirname, '..', 'models', 'od'));

router.use(util.allowedUsers(['faculty']));


router.route('/')
.get(function(req, res, next){
  res.render('faculty');
})

router.route('/ods')
.get(function(req, res, next)
{
    OD.find({}).populate('student').exec().then(function (ods)
    {
        /* GET /ods/list od full list. */
        return res.json({ ods: ods })
    }).catch(next);
})

router.route('/ods')
.get(function(req, res, next)
{
    OD.find({ approved: false }).populate('student').exec().then(function (ods)
    {
        /* GET /ods od list. */
        return res.json({ ods: ods })
    }).catch(next);
})
.post(function(req, res, next)
{
    OD.update({_id: {$in: req.body.ids }}, {$set: { approved: true }}, {multi: true}).exec().then(function ()
    {
        /* POST /ods approve ods. */
        return res.json({ 'message': 'success' });
    }).catch(next);
})


router.route('/export')
.get(function(req, res, next)
{
    OD.find({ approved: true }).then(function(ods)
    {
        return res.csv(ods, { fields: ['student', 'userId', 'date', 'duration']});
    })
})


module.exports = router;
