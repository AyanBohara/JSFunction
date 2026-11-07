/*
 * Promises practice
 *
 * Run this file with:
 *     node promises.js
 *
 * A Promise represents a value that will be available later.
 * Its states are: pending, fulfilled, or rejected.
 */

const wait = (milliseconds) =>
    new Promise((resolve) => {
        setTimeout(resolve, milliseconds);
    });

// 1. Creating and resolving a Promise
const simplePromise = new Promise((resolve) => {
    resolve('Promise completed');
});

simplePromise.then((message) => {
    console.log('1.', message);
});

// 2. Handling a rejected Promise with catch()
const failedPromise = new Promise((resolve, reject) => {
    reject(new Error('Something went wrong'));
});

failedPromise
    .then((message) => {
        console.log(message);
    })
    .catch((error) => {
        console.log('2.', error.message);
    });

// 3. finally() runs whether the Promise succeeds or fails
wait(100)
    .then(() => {
        console.log('3. Finished waiting');
    })
    .catch((error) => {
        console.log('3. Error:', error.message);
    })
    .finally(() => {
        console.log('3. Cleanup complete');
    });

// 4. Chaining Promises
wait(200)
    .then(() => {
        console.log('4. Step 1');
        return 'Step 1 result';
    })
    .then((result) => {
        console.log('4.', result);
        return 'Step 2 result';
    })
    .then((result) => {
        console.log('4.', result);
    });

// 5. Promise.all() waits for every Promise
const getUser = wait(150).then(() => ({ id: 1, name: 'Ayan' }));
const getCourses = wait(250).then(() => ['JavaScript', 'Node.js']);

Promise.all([getUser, getCourses]).then(([user, courses]) => {
    console.log('5. User:', user);
    console.log('5. Courses:', courses);
});

// 6. Promise.race() returns the first completed Promise
Promise.race([
    wait(300).then(() => 'Slow result'),
    wait(100).then(() => 'Fast result')
]).then((result) => {
    console.log('6.', result);
});

// 7. async/await is another way to use Promises
async function loadMessage() {
    try {
        await wait(100);
        return 'Message loaded with async/await';
    } catch (error) {
        console.log('7. Error:', error.message);
        return null;
    }
}

loadMessage().then((message) => {
    console.log('7.', message);
});

/*
 * Practice exercises
 *
 * Try solving these before looking at the answers.
 */

// Exercise 1: Create a Promise that resolves with "Success" after 1 second.
// Answer:
// wait(1000).then(() => console.log('Success'));

// Exercise 2: Create a Promise that rejects with "Invalid age" when age is below 18.
function checkAge(age) {
    return new Promise((resolve, reject) => {
        if (age >= 18) {
            resolve('You can vote');
        } else {
            reject(new Error('Invalid age'));
        }
    });
}

checkAge(21)
    .then((message) => console.log('Exercise 2:', message))
    .catch((error) => console.log('Exercise 2:', error.message));

// Exercise 3: Return the doubled number after a short delay.
function doubleAfterDelay(number) {
    return wait(100).then(() => number * 2);
}

doubleAfterDelay(5).then((result) => {
    console.log('Exercise 3:', result);
});

// Exercise 4: Use Promise.all() to add the results of two delayed numbers.
Promise.all([doubleAfterDelay(5), doubleAfterDelay(10)]).then(
    ([firstNumber, secondNumber]) => {
        console.log('Exercise 4:', firstNumber + secondNumber);
    }
);