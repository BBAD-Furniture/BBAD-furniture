/* global describe beforeEach it */

const { expect } = require('chai');
const db = require('../index');
const Review = require('./review');
const Promise = require('bluebird');

describe('The `Review` model', () => {
  beforeEach(() => {
    return db.sync({ force: true });
  });

  let review;
  let reviewText =
    'You work and feel better when you sit comfortably. MARKUS swivel chair is tested for professional office use and therefore meets your requirements for safety, durability and stability. You can easily adjust the chair to suit your body and the built-in lumbar support relieves your back. The airy mesh fabric in the backrest lets air circulate and reduces the environmental impact of transport, as it makes the chair both lighter and more compact.';

  beforeEach(() => {
    review = Review.build({
      review: reviewText,
      rating: 2
    });
  });

  afterEach(() => {
    return Promise.all([Review.truncate({ cascade: true })]);
  });

  describe('attributes definition', () => {
    it('includes `review` and `rating` fields', () => {
      return review.save().then(savedReview => {
        expect(savedReview.review).to.equal(reviewText);
        expect(savedReview.rating).to.equal(2);
      });
    });
    it('can handle long `review`', () => {
      return Review.create({
        review: reviewText,
        rating: 2
      }).then(result => {
        expect(result).to.be.an('object');
        expect(result.review).to.equal(reviewText);
        expect(result.rating).to.equal(2);
      });
    });
  }); // end describe('attributes definition')
}); // end describe('User model')
