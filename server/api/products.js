const router = require('express').Router();

const { Product } = require('../db/models');

router.get('/', (req, res, next) => {
  Product.findAll()
    .then(products => res.json(products))
    .catch(next);
});

