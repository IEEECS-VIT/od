var express = require('express');
var router = express.Router();
var path = require('path');
var Student = require(path.join(__dirname, '..', 'models', 'student'));
var util = require(path.join(__dirname, '..', 'utilities', 'util'))


router.use(util.allowedUsers(['organizer']));

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
})

module.exports = router;
