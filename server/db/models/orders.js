const Sequelize = require('sequelize');
const db = require('../db');

const Order = db.define('order', {
  status: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
});

Order.prototype.setAUser = function(user) {
  return this.setUser(user);
};

module.exports = Order;
