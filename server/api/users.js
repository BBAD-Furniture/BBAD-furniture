const router = require('express').Router();
const { User, Review } = require('../db/models');
module.exports = router;

router.get('/', (req, res, next) => {
  User.findAll({
    attributes: [
      'firstName',
      'lastName',
      'profilePic',
      'id',
      'email',
      'isAdmin'
    ],
    include: { model: Review }
    // explicitly select only the id and email fields - even though
    // users' passwords are encrypted, it won't help if we just
    // send everything to anyone who asks!
  })
    .then(users => res.json(users))
    .catch(next);
});

router.delete('/:userId', (req, res, next) => {
  User.findById(req.params.userId)
    .then(userFound => {
      return userFound.destroy();
    })
    .then(() => {
      res.send(req.params.userId);
    })
    .catch(next);
});

router.put('/:userId', (req, res, next) => {
  User.findById(req.params.userId)
    .then(userFound => {
      return userFound.update(req.body);
    })
    .then(updatedUser => {
      updatedUser ? res.json(updatedUser) : res.status(404).json();
    })
    .catch(next);
});
