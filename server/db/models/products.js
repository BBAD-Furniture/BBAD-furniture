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
    type: Sequelize.ARRAY(Sequelize.TEXT),
    allowNull: false
  },
  image: {
    type: Sequelize.ARRAY(Sequelize.TEXT),
    defaultValue: [
      'http://meeconline.com/wp-content/uploads/2014/08/placeholder.png'
    ]
  },
  color: {
    type: Sequelize.STRING,
    allowNull: false
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
});

export default Product;
