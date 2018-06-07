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
    values: ['Living Room', 'Bedroom', 'Bathroom'],
    defaultValue: 'Living Room',
    allowNull: false
  },
  image: {
    type: Sequelize.STRING, //ARRAY(Sequelize.TEXT),
    defaultValue:
      'http://demo.drfuri.com/mrbara14/wp-content/uploads/sites/15/2016/10/furniture-v4-banner1.png'
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

module.exports = Product;
