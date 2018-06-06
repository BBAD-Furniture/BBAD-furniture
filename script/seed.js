'use strict';

const { User, Product, Review, Cart } = require('../server/db/models');
const faker = require('faker');
const db = require('../server/db');
const assc = require('../server/db/models');
const Promise = db.Promise; // gives us Promise.map

async function seed() {
    await db.sync({ force: true });
    const product = await seedProduct();
    console.log('Seeded', product.length, 'product.');
    const user = await seedUser();
    console.log('Seeded', user.length, 'user.');
    const review = await seedReview();
    console.log('Seeded', review.length, 'review.');
    const cart = await seedCart();
    console.log('Seeded', cart.length, 'cart.');
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
                category: [faker.commerce.product()],
                // image: faker.image.image(),
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
                productId: Math.floor(Math.random() * 20) + 1
            })
        )
    );
}

function seedCart() {
    return Promise.all(
        new Array(5).fill(1).map(() =>
            Cart.create({
                userId: Math.floor(Math.random() * 10) + 1,
                productId: Math.floor(Math.random() * 20) + 1
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
