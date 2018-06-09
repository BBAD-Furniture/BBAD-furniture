/* global describe beforeEach it */

const { expect } = require('chai');
const db = require('../index');
const User = require('./user');
const Promise = require('bluebird');

describe('The `User` model', () => {
  beforeEach(() => {
    return db.sync({ force: true });
  });

  let user;
  beforeEach(() => {
    user = User.build({
      firstName: 'Grace',
      lastName: 'Shopper',
      email: 'graceshop@fullstack.com',
      isAdmin: false
    });
  });

  afterEach(() => {
    return Promise.all([User.truncate({ cascade: true })]);
  });

  describe('attributes definition', () => {
    it('includes `firstName`, `lastName`,`email`, and `isAdmin` fields', () => {
      return user.save().then(savedUser => {
        expect(savedUser.firstName).to.equal('Grace');
        expect(savedUser.lastName).to.equal('Shopper');
        expect(savedUser.email).to.equal('graceshop@fullstack.com');
        expect(savedUser.isAdmin).to.equal(false);
      });
    });
    it('requires `email` field', () => {
      user.email = null;

      return user.validate().then(
        () => {
          throw new Error('validation should fail when email is null');
        },
        result => {
          expect(result).to.be.an.instanceof(Error);
        }
      );
    });
  }); // end describe('attributes definition')
  describe('instance methods', () => {
    let cody;

    beforeEach(() => {
      return User.create({
        email: 'cody@puppybook.com',
        password: 'bones'
      }).then(user => {
        cody = user;
      });
    });

    it('returns true if the password is correct', () => {
      expect(cody.correctPassword('bones')).to.be.equal(true);
    });

    it('returns false if the password is incorrect', () => {
      expect(cody.correctPassword('bonez')).to.be.equal(false);
    });
  }); // end describe('instance methods')
}); // end describe('User model')
