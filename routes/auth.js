const express = require('express');
const router = express.Router();
const db = require('../models');
const passport = require('../config/ppConfig');

router.post('/signup', function(req, res) {
  db.user.findOrCreate({
    where: { email: req.body.email },
    defaults: {
      name: req.body.name,
      password: req.body.password
    }
  }).then(function([user, created]) {
    if (created) {
      passport.authenticate('local', {
        successMessage: 'successfully created user',
        successRedirect: '/profile'
      })(req, res);
    } else {
      res.json({ message: 'problem creating user' });
    }
  }).catch(function(err) {
    console.log('💥--------------------------💥');
    console.log(err);
    res.json({ message: 'problem creating user' });
  })
});

router.post('/login', passport.authenticate('local', {
  successRedirect: '/profile',
  successMessage: 'successfully logged in',
  failureMessage: 'trouble loggin in'
}));

router.get('/logout', function(req, res) {
  req.logout();
  res.json({ message: 'successfully logged out' })
})

module.exports = router