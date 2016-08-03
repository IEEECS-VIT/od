var express = require('express');
var passport = require('passport');
var router = express.Router();


router.route('/')
.get(function (req, res) 
{
  /* GET /login. */
    return res.render('login');
})
.post(passport.authenticate('local'), function login(req, res) 
{
  /* POST /login. 
   *
   * Redirect to [user-type] index on success. 
   * 400 on failure.
   */
    return res.redirect(req.user.type);
});


router.route('/logout')
.get(function (req, res) 
{
  /* GET logout. Redirect to index */
    req.logout();
    res.clearCookie();
    return res.redirect('/');
});

module.exports = router;
