const express = require('express');
const router = express.Router();
const passport = require('passport');
const { User } = require('../models/setup');

router.get('/login', (req, res) => {
  res.send(`
    <form method="post" action="/auth/login">
      <div>
        <label for="username">Username:</label>
        <input type="text" id="username" name="username">
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" id="password" name="password">
      </div>
      <button type="submit">Login</button>
    </form>
  `);
});

router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/admin',
    failureRedirect: '/auth/login',
    failureFlash: true
  })(req, res, next);
});

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/auth/login');
});

module.exports = router;
