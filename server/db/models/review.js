const Sequelize = require('sequelize');
const db = require('../db');

const Review = db.define('review', {
  review: Sequelize.TEXT,
  rating: {
    type: Sequelize.INTEGER,
    validate: {
      min: 1,
      max: 5
    },
    defaultValue: null
  }
});

module.exports = Review;
