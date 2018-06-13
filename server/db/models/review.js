const Sequelize = require('sequelize');
const db = require('../db');

const Review = db.define('review', {
  name: Sequelize.STRING,
  profilePic: {
    type: Sequelize.STRING,
    defaultValue: 'https://i.stack.imgur.com/l60Hf.png'
  },
  review: Sequelize.TEXT,
  rating: {
    type: Sequelize.INTEGER,
    validate: {
      min: 1,
      max: 5
    },
    defaultValue: 5
  }
});

module.exports = Review;
