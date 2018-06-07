const User = require('./user');
const Review = require('./review');
const Product = require('./products');
const Order = require('./orders');
const OrderDetail = require('./orderDetail');

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

User.hasMany(Review);
Order.belongsTo(User);
User.hasMany(Order);
Product.hasMany(Review);
Product.belongsToMany(Order, { through: OrderDetail });
Order.belongsToMany(Product, { through: OrderDetail });

Review.belongsTo(User);
Review.belongsTo(Product);

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User,
  Product,
  Order,
  Review,
  OrderDetail
};
