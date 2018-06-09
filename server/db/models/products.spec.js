/* global describe beforeEach it */

const { expect } = require('chai');
const db = require('../index');
const Product = require('./products');
const Promise = require('bluebird');

describe('The `Product` model', () => {
  beforeEach(() => {
    return db.sync({ force: true });
  });

  let product;
  let content =
    'Adjust the height and angle of this chair so your work day feels comfortable. The mesh backrest lets air through so you keep cool even when the workload rises. Built to outlast years of ups and downs.';

  beforeEach(() => {
    product = Product.build({
      name: 'MARKUS',
      description: content,
      price: 199.0,
      category: 'Living Room',
      color: 'black',
      quantity: 1
    });
  });

  afterEach(() => {
    return Promise.all([Product.truncate({ cascade: true })]);
  });

  describe('attributes definition', () => {
    it('includes `name`, `description`,`price`, and `category` fields', () => {
      return product.save().then(savedProduct => {
        expect(savedProduct.name).to.equal('MARKUS');
        expect(savedProduct.description).to.equal(content);
        expect(savedProduct.price).to.equal(199.0);
        expect(savedProduct.category).to.equal('Living Room');
        expect(savedProduct.color).to.equal('black');
        expect(savedProduct.quantity).to.equal(1);
      });
    });
    it('requires all fields', () => {
      product.name = null;
      product.description = null;
      product.price = null;
      product.category = null;
      product.color = null;
      product.quantity = null;

      return product.validate().then(
        () => {
          throw new Error('validation should fail when null');
        },
        result => {
          expect(result).to.be.an.instanceof(Error);
        }
      );
    });
    it('can handle long `description`', () => {
      return Product.create({
        name: 'MARKUS',
        description: content,
        price: 199.0,
        category: 'Living Room',
        color: 'black',
        quantity: 1
      }).then(result => {
        expect(result).to.be.an('object');
        expect(result.description).to.equal(content);
      });
    });
  }); // end describe('attributes definition')
}); // end describe('User model')
