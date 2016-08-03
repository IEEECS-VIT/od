var express = require('express');
var router = express.Router();
var path = require('path');
var moment = require('moment');
var Student = require(path.join(__dirname, '..', 'models', 'student'));
var OD = require(path.join(__dirname, '..', 'models', 'od'));
var util = require(path.join(__dirname, '..', 'utilities', 'util'));
var moment = require('moment');
var momentTimezone = require('moment-timezone').tz;

//router.use(util.allowedUsers(['organizer']));

/* GET home page. */
router.route('/')
.get(function(req, res, next) {


  res.render('apply');
  
});

router.route('/student')
.get(function findStudent(req, res, next)
{
  /* GET /student?id=
 *
 * returns student data as json.
 * 404 if not found.
 */
  if (!req.query.id)
  {
      var error = new Error('Not Found');
      error.status = 404;
      return next(error);
  }

  Student.findById(req.query.id).exec()
  .then(function (student)
  {
      if (!student)
    {
          var error = new Error('Not Found');
          error.status = 404;
          return next(error);
      }
      student.message='success';
      return res.json(student);
  })
  .catch(next);

})
.post(function createStudent(req, res, next){
  /* POST /student
   *
   * req.body must have keys: [_id, name]
   */
    var student = new Student(req.body);
    student.save()
  .then(function (student)
  {
      return res.json({ message: 'success', participant: student });
  })
  .catch(next);
});

router.route('/apply')
.post(function postRegister(req, res, next)
{
   /* POST /register.
    *
    * req.body must have keys: [student].
    * req.body.student must have keys: [_id, name, startTime, endTime, date]
    */

    var newOD = new OD(
      {
        student : req.body._id, // student
        userId : req.user._id,
        date : req.body.date,
        duration: req.body.duration
      });
  newOD.save()
  .then(function (od)
  {
      od.message = 'success';
      res.json(od);
  })
  .catch(next);
});

module.exports = router;
