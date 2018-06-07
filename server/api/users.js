const router = require('express').Router();
const { User, Review } = require('../db/models');
module.exports = router;

router.get('/', (req, res, next) => {
  User.findAll({
    attributes: ['id', 'email'],
    include: { model: Review }
    // explicitly select only the id and email fields - even though
    // users' passwords are encrypted, it won't help if we just
    // send everything to anyone who asks!
  })
    .then(users => res.json(users))
    .catch(next);
});
