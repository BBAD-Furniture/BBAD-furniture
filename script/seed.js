'use strict';
const {
  User,
  Product,
  Review,
  Order,
  OrderDetail
} = require('../server/db/models');
const faker = require('faker');
const db = require('../server/db');
const Promise = db.Promise; // gives us Promise.map

async function seed() {
  await db.sync({ force: true });
  const user = await seedUser();
  console.log('Seeded', user.length, 'user.');
  const product = await seedProduct();
  console.log('Seeded', product.length, 'product.');
  // console.log('Seeded', user, 'all the users');
  const review = await seedReview();
  console.log('Seeded', review.length, 'review.');
  const order = await seedOrder();
  console.log('Seeded', order.length, 'order.');
}

function seedUser() {
  return Promise.all(
    new Array(10).fill(1).map(() =>
      User.create({
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        password: faker.internet.password()
      })
    )
  );
}

function seedProduct() {
  return Promise.all(
    new Array(20).fill(1).map(() =>
      Product.create({
        name: faker.name.firstName(),
        description: faker.lorem.text(),
        price: (Math.random() * 100).toFixed(2),
        color: faker.commerce.color(),
        quantity: Math.floor(Math.random() * 100)
      })
    )
  );
}

function seedReview() {
  return Promise.all(
    new Array(20).fill(1).map(() =>
      Review.create({
        review: faker.lorem.paragraph(),
        userId: Math.floor(Math.random() * 10) + 1,
        rating: Math.floor(Math.random() * 5) + 1,
        productId: Math.floor(Math.random() * 20) + 1
      })
    )
  );
}

function seedOrder() {
  return Promise.all(
    new Array(5).fill(1).map(() =>
      Order.create({
        userId: Math.floor(Math.random() * 10) + 1,
        productId: Math.floor(Math.random() * 20) + 1 //dont need!!!!
      })
    )
  );
}

const exit = () => process.exit(0);
const die = err => {
  console.error(err);
  process.exit(1);
};

if (module === require.main) seed().then(exit, die);
