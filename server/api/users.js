const router = require('express').Router();
const { User, Review, Order, Product, OrderDetail } = require('../db/models');
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
    include: [{ model: Review }, { model: Order }]
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

router.post('/:userId/order', (req, res, next) => {
  if (req.user) {
    User.findById(req.params.userId)
      .then(userFound => {
        return userFound.getCurrentOrder(); // getting ONLY orders with status false
      })
      .spread(userCurrentOrder => {
        userCurrentOrder
          ? Product.findById(req.body.productId) //If Order exists, add product to it
              .then(prod => {
                return userCurrentOrder.addProducts([prod]);
              })
              .then(data => {
                if (!data.length) {
                  // increment quantity of already existing order
                  OrderDetail.findOne({
                    where: {
                      productId: req.body.productId,
                      orderId: userCurrentOrder.getDataValue('id')
                    }
                  }).then(ord => {
                    const prevQuantity = ord.quantity;
                    return ord.update({ quantity: prevQuantity + 1 });
                  });
                }
                res.json(data);
              })
          : Order.create() //Else create new Order
              .then(order => {
                return order.setAUser(req.params.userId);
              })
              .then(userOrder => {
                Product.findById(req.body.productId).then(prod => {
                  return userOrder.addProducts([prod]);
                });
              })
              .then(data => {
                res.json(data);
              });
      })
      .catch(next);
  } else {
    res.json('Permission Denied!!');
  }
});

router.get('/:userId/order', (req, res, next) => {
  User.findById(req.params.userId)
    .then(user => {
      return user.getCurrentOrder(); // getting ONLY orders with status false
    })
    .spread(order => {
      // console.log('order>>>', order);
      !order
        ? res.json(null) //if no orders for the user, return null
        : OrderDetail.findAll({
            where: {
              orderId: order.id
            }
          })
            .then(items => {
              items ? res.json(items) : res.status(404).json();
            })
            .catch(next);
    });
});

// router.put(`/:userId/order`, (req, res, next) => {
//   // console.log('user>>>>>>>>>', req.user);
//   console.log('body>>>>>>>>', req.body);
//   req.user.getCurrentOrder().spread(order => {
//     OrderDetail.findOne({
//       where: {
//         orderId: order.id,
//         productId: req.body.productId
//       }
//     })
//       .then(ord => {
//         // const prevQuantity = ord.quantity;
//         return ord.update({ quantity: req.body.quantity });
//       })
//       .then(data => {
//         data ? res.json(data) : res.status(404).json();
//       });
//   });
// });
