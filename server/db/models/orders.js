const Sequelize = require('sequelize');
const db = require('../db');

const Order = db.define('order', {
  status: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
});

module.exports = Order;
