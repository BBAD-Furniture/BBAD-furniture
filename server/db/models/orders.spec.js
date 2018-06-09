/* global describe beforeEach it */

const { expect } = require('chai');
const db = require('../index');
const Order = require('./orders');
const Promise = require('bluebird');

describe('The `Order` model', () => {
  beforeEach(() => {
    return db.sync({ force: true });
  });

  let order;

  beforeEach(() => {
    order = Order.build({
      status: false
    });
  });

  afterEach(() => {
    return Promise.all([Order.truncate({ cascade: true })]);
  });

  describe('attributes definition', () => {
    it('includes `status` field', () => {
      return order.save().then(savedOrder => {
        expect(savedOrder.status).to.equal(false);
      });
    });
  }); // end describe('attributes definition')
}); // end describe('User model')
