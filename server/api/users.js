const router = require('express').Router();
const { User, Review, Order, Product, OrderDetail } = require('../db/models');
module.exports = router;

router.get('/', (req, res, next) => {
  if (req.user) {
    console.log('REQ>USER::::', req.user.fullName);
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
  } else {
    console.log('NO USER LOGGED IN');
    res.json('Permission Denied');
  }
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

router.post(`/:userId/item/delete`, (req, res, next) => {
  const { itemId } = req.body;
  console.log('itemId>>>>', itemId);
  req.user
    .getCurrentOrder()
    .spread(order => {
      OrderDetail.findOne({
        where: {
          productId: itemId,
          orderId: order.id
        }
      })
        .then(orderDet => {
          return orderDet.destroy();
        })
        .then(deletedOrderDet => {
          res.json(itemId);
        });
    })
    .catch(next);
  // console.log('user>>>>>>>>>', req.user);
});

router.put(`/:userId/order`, (req, res, next) => {
  const { status } = req.body;

  req.user
    .getCurrentOrder() //get ONLY orders with status false
    .spread(order => {
      return order.getProducts().then(prods => {
        OrderDetail.findAll({
          where: {
            orderId: order.id
          }
        }).then(ordDets => {
          prods.map((p, idx) => {
            let ans = p.changeQuantity(ordDets[idx].quantity);
            p.update({ quantity: ans });
          });
          order.update({ status }).then(data => res.json(data));
        });
      });
    });
});

router.get('/:userId/allOrders', (req, res, next) => {
  req.user.getCompletedOrder().then(allOrders => {
    allOrders ? res.json(allOrders) : res.status(404).json();
  });
});

router.get('/:userId/allOrdersInfo', (req, res, next) => {
  req.user.getCompletedOrder().then(allOrders => {
    let arr = allOrders.map(e => {
      return OrderDetail.findAll({
        where: {
          orderId: e.id
        }
      });
    });
    Promise.all(arr).then(data => {
      data ? res.json(data) : res.status(404).json();
    });
  });
});
