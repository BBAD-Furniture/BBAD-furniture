const router = require('express').Router();

const { Product } = require('../db/models');

router.get('/', (req, res, next) => {
  Product.findAll()
    .then(products => res.json(products))
    .catch(next);
});

router.get('/:id', (req, res, next) => {
  let id = req.params.id;
  Product.find({
    where: {
      id
    }
  })
    .then(product => res.json(product))
    .catch(next);
});

router.post('/', (req, res, next) => {
  Product.create(req.body)
    .then(newProduct => res.status(201).send(newProduct))
    .catch(next);
});

router.delete('/:id', (req, res, next) => {
  let id = req.params.id;

  Product.findById(id)
    .then(product => product.destroy())
    .then(() => res.send('deleted!'))
    .catch(next);
});
module.exports = router;
