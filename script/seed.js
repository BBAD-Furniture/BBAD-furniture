'use strict';

// const db = require('../server/db');
// const { User } = require('../server/db/models');

// /**
//  * Welcome to the seed file! This seed file uses a newer language feature called...
//  *
//  *                  -=-= ASYNC...AWAIT -=-=
//  *
//  * Async-await is a joy to use! Read more about it in the MDN docs:
//  *
//  * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
//  *
//  * Now that you've got the main idea, check it out in practice below!
//  */

// async function seed() {
//     await db.sync({ force: true });
//     console.log('db synced!');
//     // Whoa! Because we `await` the promise that db.sync returns, the next line will not be
//     // executed until that promise resolves!
//     const users = await Promise.all([
//         User.create({
//             firstName: 'cody',
//             lastName: 'smith',
//             email: 'cody@email.com',
//             password: '123',
//             isAdmin: false
//         })
//         // User.create({ email: 'murphy@email.com', password: '123' })
//     ]);
//     // Wowzers! We can even `await` on the right-hand side of the assignment operator
//     // and store the result that the promise resolves to in a variable! This is nice!
//     console.log(`seeded ${users.length} users`);
//     console.log(`seeded successfully`);
// }

// // Execute the `seed` function, IF we ran this module directly (`node seed`).
// // `Async` functions always return a promise, so we can use `catch` to handle
// // any errors that might occur inside of `seed`.
// if (module === require.main) {
//     seed()
//         .catch(err => {
//             console.error(err);
//             process.exitCode = 1;
//         })
//         .then(() => {
//             // `finally` is like then + catch. It runs no matter what.
//             console.log('closing db connection');
//             db.close();
//             console.log('db connection closed');
//         });
//     /*
//    * note: everything outside of the async function is totally synchronous
//    * The console.log below will occur before any of the logs that occur inside
//    * of the async function
//    */
//     console.log('seeding...');
// }

// // we export the seed function for testing purposes (see `./seed.spec.js`)
// module.exports = seed;

//------------------- OWN SEED FILE ----------------------
const { User, Product, Review, Cart } = require('../server/db/models');
const faker = require('faker');
const db = require('../server/db');
const assc = require('../server/db/models');
const Promise = db.Promise; // gives us Promise.map

async function seed() {
    await db.sync({ force: false });
    const product = await seedProduct();
    console.log('Seeded', product.length, 'product.');
    const user = await seedUser();
    console.log('Seeded', user.length, 'user.');
    const review = await seedReview();
    console.log('Seeded', review.length, 'review.');
    const cart = await seedCart();
    console.log('Seeded', cart.length, 'cart.');
}

function seedUser(users) {
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

function seedProduct(products) {
    return Promise.all(
        new Array(50).fill(1).map(() =>
            Product.create({
                name: faker.name.firstName(),
                description: faker.lorem.text(),
                price: (Math.random() * 100).toFixed(2),
                category: [faker.commerce.product()],
                image: faker.image.image(),
                color: faker.commerce.color(),
                quantity: Math.floor(Math.random() * 100)
            })
        )
    );
}

function seedReview(reviews) {
    return Promise.all(
        new Array(60).fill(1).map(() =>
            Review.create({
                review: faker.lorem.paragraph(),
                userId: Math.floor(Math.random() * 10) + 1,
                productId: Math.floor(Math.random() * 50) + 1
            })
        )
    );
}

function seedCart(carts) {
    return Promise.all(
        new Array(5).fill(1).map(() =>
            Cart.create({
                userId: Math.floor(Math.random() * 10) + 1,
                productId: Math.floor(Math.random() * 50) + 1
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
