const router = require('express').Router();
const { Product, Review, User } = require('../db/models');

router.get('/', (req, res, next) => {
  Product.findAll({
    include: {
      all: true
    }
  })
    .then(products => res.json(products))
    .catch(next);
});

router.get('/:productId', (req, res, next) => {
  let id = req.params.productId;
  Product.findAll({
    where: {
      id
    },
    include: [{ all: true }]
  })
    .then(product => res.json(product))
    .catch(next);
});

router.post('/', (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    Product.create(req.body)
      .then(newProduct => res.status(201).send(newProduct))
      .catch(next);
  } else {
    res.json('Permisiion Denied!!!');
  }
});

router.put('/:productId', (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    Product.findById(req.params.productId)
      .then(productFound => {
        return productFound.update(req.body);
      })
      .then(updatedProduct => {
        updatedProduct ? res.json(updatedProduct) : res.status(404).json();
      })
      .catch(next);
  } else {
    res.json('Permisiion Denied!!!');
  }
});

router.delete('/:productId', (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    let id = req.params.productId;
    Product.findById(id)
      .then(product => product.destroy())
      .then(() => res.send('deleted!'))
      .catch(next);
  } else {
    res.json('Permisiion Denied!!!');
  }
});

router.post('/:productId/review', function(req, res, next) {
  if (req.user) {
    Review.create({
      name: req.user.fullName,
      userId: req.body.userId,
      productId: req.body.productId,
      review: req.body.review,
      rating: req.body.rating
    })
      .then(created => {
        res.json(created);
      })
      .catch(next);
  } else {
    res.json('permission denied');
  }
});

module.exports = router;
