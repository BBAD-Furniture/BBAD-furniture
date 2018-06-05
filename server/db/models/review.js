const Sequelize = require('sequelize');
const db = require('../db');

const Review = db.define('review', {
    review: Sequelize.TEXT
});

module.exports = Review;
