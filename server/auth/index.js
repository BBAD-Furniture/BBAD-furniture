const router = require('express').Router();
const User = require('../db/models/user');
const { Review } = require('../db/models');
module.exports = router;

router.post('/login', (req, res, next) => {
  User.findOne({ where: { email: req.body.email }, include: { model: Review } })
    .then(user => {
      if (!user) {
        console.log('No such user found:', req.body.email);
        res.status(401).send('Wrong username and/or password');
      } else if (!user.correctPassword(req.body.password)) {
        console.log('Incorrect password for user:', req.body.email);
        res.status(401).send('Wrong username and/or password');
      } else {
        req.login(user, err => (err ? next(err) : res.json(user)));
      }
    })
    .catch(next);
});

router.post('/signup', (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;
  User.create({ firstName, lastName, email, password })
    .then(user => {
      req.login(user, err => (err ? next(err) : res.json(user)));
    })
    .catch(err => {
      if (err.name === 'SequelizeUniqueConstraintError') {
        res.status(401).send('User already exists');
      } else {
        next(err);
      }
    });
});

router.delete('/logout', (req, res) => {
  req.logout();
  req.session.destroy();
  console.log('AFTER LOGOUT USER IS:', req.user);
  res.redirect('/');
});

router.get('/me', (req, res) => {
  return User.findById(req.user.id, {
    include: { model: Review }
  }).then(user => res.json(user));
});

router.use('/google', require('./google'));
