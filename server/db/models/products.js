const Sequelize = require('sequelize');
const db = require('../db');

const Product = db.define('product', {
  // column names go here
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  price: {
    type: Sequelize.FLOAT,
    allowNull: false
  },
  category: {
    type: Sequelize.ENUM,
    values: ['Living Room', 'Bedroom', 'Bathroom', 'Office', 'Kitchen'],
    defaultValue: 'Living Room',
    allowNull: false
  },
  image: {
    type: Sequelize.STRING,
    defaultValue:
      'http://demo.drfuri.com/mrbara14/wp-content/uploads/sites/15/2016/07/a1.jpg'
  },
  color: {
    type: Sequelize.STRING,
    allowNull: false
  },
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 1,
    allowNull: false
  }
});

Product.prototype.changeQuantity = function(orderQuantity) {
  this.quantity = this.quantity - orderQuantity;
  return this.quantity;
};

module.exports = Product;
