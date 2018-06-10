const Sequelize = require('sequelize');
const db = require('../db');

const OrderDetail = db.define('orderDetail', {
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 1
  },
  price: {
    type: Sequelize.FLOAT,
    // allowNull: false,
    defaultValue: 0
  }
});

module.exports = OrderDetail;
