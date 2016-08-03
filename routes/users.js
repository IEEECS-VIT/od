var express = require('express');
var path = require('path');
var util = require(path.join(__dirname, '..', 'utilities', 'util'))

var router = express.Router();


router.use(util.allowedUsers(['organizer']));
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
